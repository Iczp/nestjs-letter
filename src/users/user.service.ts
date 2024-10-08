/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';
import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { isEmpty } from 'class-validator';
import { isGuid } from 'src/common/validator';
import * as security from 'src/common/security';
import { client, e } from 'src/edgedb';
import { Assert } from 'src/common';
import { Cache } from '@nestjs/cache-manager';
import {
  UserAutoCreateInput,
  UserCreateInput,
  UserDetailDto,
  UserDto,
  UserGetListInput,
  UserUpdateInput,
} from './users.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CurrentUser } from './users.current';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

@Injectable({
  // scope: Scope.REQUEST,
})
export class UsersService extends CrudService<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    // @Inject(REQUEST)
    // private request: Request,
    // @Inject(CONTEXT) private context
    private currentUser: CurrentUser,
  ) {
    super();
  }
  public readonly entity = e.User;

  override mapToDetailDto(item: any): Promise<UserDetailDto> {
    delete item.password;
    return super.mapToDetailDto(item);
  }

  public async validatePassword(account: string, password: string) {
    const users = await e
      .select(e.User, (user) => ({
        ...user['*'],
        limit: 1,
        filter: e.op(user.account, '?=', e.cast(e.str, account)),
      }))
      .run(client);

    Assert.If(users.length === 0, `账号不存在:${account}`);

    const user = users[0];

    Assert.If(user.is_deleted, `用户不存在: ${account}`);

    Assert.If(!(await security.compare(password, user.password)), `密码错误`);

    Assert.If(!user.is_enabled, `用户被禁用: ${account}`);

    return user;
  }

  override async getList(
    input: UserGetListInput,
  ): Promise<PagedResultDto<UserDto>> {
    return await super.getList(input);
    // return {
    //   user: this.currentUser.user,
    //   ...(await super.getList(input)),
    // } as PagedResultDto<UserDto>;
  }

  override itemSelect(id: string, entity: any): object {
    return {
      ...entity['*'],
      password: false,
      // roles: {
      //   // id: true,
      //   creation_time: true,
      //   role: {
      //     id: true,
      //     name: true,
      //     // creation_time: true,
      //   },
      // },
      roles: (r) => ({
        // id: true,
        creation_time: true,
        role_id: r.role.id,
        name: r.role.name,
        // role_creation_time: r.role.creation_time,
        // filter: e.op(r.role.is_static, '=', true),
      }),
    };
  }

  override listSelect(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: UserGetListInput,
    // entity: ExtractDBType<typeof e.User>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    entity: any,
  ) {
    return {
      ...entity['*'],
      password: false,
      roles: {
        // id: true,
        creation_time: true,
        role: {
          id: true,
          name: true,
          // creation_time: true,
        },
      },
      // roles: (r) => ({
      //   id: true,
      //   creation_time: true,
      //   role_id: r.role.id,
      //   name: r.role.name,
      //   role_creation_time: r.role.creation_time,
      //   filter: e.op(r.role.is_static, '=', true),
      // }),
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
      .addIf(!isEmpty(input.erp_user_id), () =>
        e.op(entity.erp_user_id, '?=', e.cast(e.str, input.erp_user_id)),
      )
      .addIf(!isEmpty(input.userType), () =>
        e.op(entity.user_type, '?=', e.cast(e.UserType, input.userType)),
      )
      .addIf(!isEmpty(input.gender), () =>
        e.op(entity.gender, '=', e.cast(e.Gender, input.gender)),
      )
      .addIf(!isEmpty(input.is_enabled), () =>
        e.op(entity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .addIf(!isEmpty(input.keyword), () =>
        e.op(entity.name, 'ilike', e.cast(e.str, `%${input.keyword}%`)),
      )
      .all();
  }

  public override async mapToUpdateEntity(
    input: UserUpdateInput,
  ): Promise<PromiseResult> {
    const entity = e.User;
    return await Promise.resolve({
      name: input.name ?? entity.name,
      phone: input.phone ?? entity.phone,
      gender: input.gender ?? entity.gender,
    });
  }

  public override async mapToCreateEntity(
    input: UserCreateInput,
  ): Promise<PromiseResult> {
    const password = await security.encrypt(input.passoword);
    return {
      account: input.account,
      password,
      name: input.name,
      gender: input.gender,
      user_type: input.userType,
      phone: input.phone,
      is_enabled: input.is_enabled,
    };
  }

  async findOneByErpUserId(erpUserId: string) {
    const users = await e
      .select(e.User, (user) => ({
        ...user['*'],
        filter: e.op(user.erp_user_id, '=', erpUserId),
      }))
      .run(client);
    if (users.length > 1) {
      return users[0];
    }
    return null;
  }

  async createIfNotContains(input: UserAutoCreateInput) {
    const ret = await client.transaction(async (tx) => {
      const password = await security.encrypt(input.passoword);
      const user = await e
        .insert(e.User, {
          password,
          account: input.account,
          name: input.name,
          gender: input.gender,
          user_type: input.userType,
          phone: input.phone,
          is_enabled: input.is_enabled,
          erp_user_id: input.erp_user_id,
        })
        .unlessConflict((u) => ({
          on: e.tuple([u.account, u.erp_user_id]),
          else: u,
        }))
        .run(tx);

      // apply default roles
      const defaultRoles = await e
        .select(e.Role, (role) => ({
          id: true,
          filter: e.op(role.is_default, '=', e.bool(true)),
        }))
        .run(tx);

      const userRoles = defaultRoles.map((role) => ({ user, role }));

      const insertDefaultRoles = await e
        .params(
          {
            userRoles: e.json,
          },
          (params) => {
            return e.for(e.json_array_unpack(params.userRoles), (item) => {
              return e
                .insert(e.UserRole, {
                  user: e.select(e.User, () => ({
                    filter_single: { id: e.cast(e.uuid, item.user.id) },
                  })),
                  role: e.select(e.Role, () => ({
                    filter_single: { id: e.cast(e.uuid, item.role.id) },
                  })),
                } as never)
                .unlessConflict((rp) => ({
                  on: e.tuple([rp.user, rp.role]),
                  else: rp,
                }));
            });
          },
        )
        .run(tx, {
          userRoles,
        });

      console.log('insertDefaultRoles', insertDefaultRoles);

      return { user, insertDefaultRoles };
    });
    return ret;
  }

  // override async create(input: UserCreateInput): Promise<UserDetailDto> {
  //   await this.checkPolicy(this.Create_PolicyName);
  //   const inputDto = await this.mapToCreateEntity(input);
  //   console.log('create inputDto', inputDto);
  //   const queryCreate = e.insert(e.User, inputDto as never);

  //   // const queryDisplay = e.select(queryCreate, () => this.createSelect(input));
  //   const ret = await queryDisplay.run(client);
  //   return await this.mapToDetailDto(ret);
  //   return super.create(input);
  // }

  // public async create(input: TCreateInput): Promise<TDetailDto> {

  // }
}
