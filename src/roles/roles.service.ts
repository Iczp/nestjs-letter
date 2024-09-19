import { Injectable, Logger } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';
import { PromiseResult } from 'src/types/PromiseResult';
import { Filters } from 'src/common/Filters';
import { e, client } from 'src/edgedb';
import { Assert, Checker } from 'src/common';
import {
  RoleCreateInput,
  RoleDetailDto,
  RoleDto,
  RoleGetListInput,
  RoleUpdateInput,
  SetPermissionsInput,
} from './roles.dto';
@Injectable()
export class RolesService extends CrudService<
  RoleDto,
  RoleDetailDto,
  RoleGetListInput,
  RoleCreateInput,
  RoleUpdateInput
> {
  public readonly entity = e.Role;

  public override itemSelect(id: string, entity: any): object {
    return {
      ...entity['*'],
      permissions: {
        id: true,
        creation_time: true,
        is_deleted: true,
        permission: {
          id: true,
          name: true,
          code: true,
          is_enabled: true,
        },
      },
    };
  }

  public override listFilter(
    input: RoleGetListInput,
    // entity: ExtractDBType<typeof e.Role>,
    entity: any,
  ) {
    return new Filters([e.op(entity.is_deleted, '=', e.bool(false))])
      .addIf(!Checker.isEmpty(input.permission_code), () =>
        e.op(
          entity.permissions.permission.code,
          '?=',
          e.str(input.permission_code),
        ),
      )
      .addIf(!Checker.isEmpty(input.user_id), () =>
        e.op(entity.users.user.id, '?=', e.uuid(input.user_id)),
      )
      .addIf(!Checker.isEmpty(input.is_default), () =>
        e.op(entity.is_default, '?=', e.bool(input.is_default)),
      )
      .addIf(!Checker.isEmpty(input.is_public), () =>
        e.op(entity.is_public, '?=', e.bool(input.is_public)),
      )
      .addIf(!Checker.isEmpty(input.is_static), () =>
        e.op(entity.is_static, '?=', e.bool(input.is_static)),
      )
      .addIf(!Checker.isEmpty(input.is_enabled), () =>
        e.op(entity.is_enabled, '?=', e.bool(input.is_enabled)),
      )
      .addIf(!Checker.isEmpty(input.keyword), () =>
        e.op(entity.name, 'ilike', e.cast(e.str, `%${input.keyword}%`)),
      )
      .and();
  }

  public override mapToUpdateEntity(input: RoleUpdateInput): PromiseResult {
    const entity = e.Role;
    return Promise.resolve({
      name: input.name ?? entity.name,
      is_default: input.is_default ?? entity.is_default,
      is_public: input.is_public ?? entity.is_public,
      is_enabled: input.is_enabled ?? entity.is_enabled,
    });
  }

  public override mapToCreateEntity(input: RoleCreateInput): PromiseResult {
    return Promise.resolve({
      name: input.name,
      code: input.code,
      is_default: input.is_default,
      is_public: input.is_public,
      is_enabled: input.is_enabled,
      //   is_static: input.is_static,
    });
  }

  public async setPermissions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: SetPermissionsInput,
  ) {
    // Assert.If(!isGuid(id), `必须为 uuid, id:${id}`);
    Assert.IfNotGuid(id);
    const idlist = input.permissions;
    Logger.log(idlist, 'RoleSService.setPermissions');
    const selPermissions = e.params({ idlist: e.array(e.uuid) }, ({ idlist }) =>
      e.select(e.Permission, (permission) => ({
        id: true,
        filter: e.op(permission.id, 'in', e.array_unpack(idlist)),
      })),
    );
    // Logger.log(
    //   selPermissions.toEdgeQL(),
    //   'RoleSService.setPermissions query.toEdgeQL()',
    // );

    const delPermissions = e.params({ idlist: e.array(e.uuid) }, ({ idlist }) =>
      e.delete(e.RolePermission, (entity) => ({
        filter: new Filters([
          e.op(entity.role.id, '=', e.cast(e.uuid, id)),
          e.op(entity.permission.id, 'not in', e.array_unpack(idlist)),
        ]).all(),
      })),
    );

    const addRolePermissions = e.params(
      {
        rolePermissions: e.json,
      },
      (params) => {
        return e.for(e.json_array_unpack(params.rolePermissions), (item) => {
          return e
            .insert(e.RolePermission, {
              permission: e.select(e.Permission, () => ({
                filter_single: { id: e.cast(e.uuid, item.permission.id) },
              })),
              role: e.select(e.Role, () => ({
                filter_single: { id: e.cast(e.uuid, item.role.id) },
              })),
            } as never)
            .unlessConflict((rp) => ({
              on: e.tuple([rp.permission, rp.role]),
              else: rp,
            }));
        });
      },
    );

    // 事务
    const ret = await client.transaction(async (tx) => {
      const deleteResult = await delPermissions.run(tx, { idlist });
      const permissions = await selPermissions.run(tx, { idlist });
      const insertResult = await addRolePermissions.run(tx, {
        rolePermissions: permissions.map((x) => ({
          role: { id },
          permission: { id: x.id },
        })),
      });
      return { permissions, deleteIds: deleteResult, insertResult };
    });

    Logger.log(ret.permissions, 'RoleSService.setPermissions');

    return ret;
  }
}
