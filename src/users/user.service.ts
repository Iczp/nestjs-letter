import { Injectable } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
import { UserDto } from './dtos/UserDto';
import { CrudService } from 'src/bases/CrudService';
import { UserDetailDto } from './dtos/UserDetailDto';
import { UserGetListInput } from './dtos/UserGetListInput';
import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { isEmpty } from 'class-validator';
import { isGuid } from 'src/common/validator';

@Injectable()
export class UserService extends CrudService<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  public readonly entity = e.User;

  override listSelect(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: UserGetListInput,
    // entity: ExtractDBType<typeof e.User>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    entity: any,
  ) {
    return {
      id: true,
      name: true,
      roles: {
        role: {
          id: true,
          name: true,
        },
      },
      // filter: this.listFilter(input, entity),
      // filter: e.op(entity.roles.role.id, '=', e.cast(e.uuid, input.role_id)),
      // --------------------------------------
      // filter: e.all(
      //   e.set(e.op(entity.roles.role.id, '?=', e.cast(e.uuid, input.role_id))),
      // ),
    };
  }

  public listFilter(
    input: UserGetListInput,
    // entity: ExtractDBType<typeof e.User>,
    entity: any,
  ) {
    const isGuidRole = isGuid(input.role);
    return new Filters([e.op(entity.is_deleted, '=', e.bool(false))])
      .addIf(isGuidRole, () =>
        e.op(entity.roles.role.id, '?=', e.cast(e.uuid, input.role)),
      )
      .addIf(!isEmpty(input.role) && !isGuidRole, () =>
        e.op(entity.roles.role.code, '?=', e.cast(e.str, input.role)),
      )
      .addIf(!isEmpty(input.userType), () =>
        e.op(entity.user_type, '=', e.cast(e.UserType, input.userType)),
      )
      .addIf(!isEmpty(input.gender), () =>
        e.op(entity.gender, '=', e.cast(e.Gender, input.gender)),
      )
      .addIf(!isEmpty(input.is_enabled), () =>
        e.op(entity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .addIf(!isEmpty(input.keyword), () =>
        e.op(entity.name, 'ilike', e.cast(e.str, `${input.keyword}`)),
      )
      .all();
  }

  public override mapToUpdateEntity(input: UserUpdateInput): PromiseResult {
    const entity = e.User;
    return Promise.resolve({
      name: input.name ?? entity.name,
      phone: input.phone ?? entity.phone,
      gender: input.gender ?? entity.gender,
    });
  }

  public override mapToCreateEntity(input: UserCreateInput): PromiseResult {
    return Promise.resolve({
      name: input.name,
      gender: input.gender,
      user_type: input.userType,
      phone: input.phone,
      is_enabled: input.is_enabled,
    });
  }
}
