import { Injectable } from '@nestjs/common';

import { CrudService } from 'src/bases/CrudService';

import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { isEmpty } from 'class-validator';
import { isGuid } from 'src/common/validator';
import * as security from 'src/common/security';
import { client, e } from 'src/edgedb';
import { assert } from 'src/common';
import {
  UserCreateInput,
  UserDetailDto,
  UserDto,
  UserGetListInput,
  UserUpdateInput,
} from './users.dto';

@Injectable()
export class UsersService extends CrudService<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
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

    assert.If(users.length === 0, `账号不存在:${account}`);

    const user = users[0];

    assert.If(user.is_deleted, `用户不存在: ${account}`);

    assert.If(!(await security.compare(password, user.password)), `密码错误`);

    assert.If(!user.is_enabled, `用户被禁用: ${account}`);

    return user;
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
        role: {
          id: true,
          name: true,
        },
        creation_time: true,
      },
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
        e.op(entity.name, 'ilike', e.cast(e.str, `${input.keyword}`)),
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
}
