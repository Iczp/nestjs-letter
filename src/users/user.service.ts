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
import { ExtractDBType } from 'src/types/ExtractDBType';

@Injectable()
export class UserService extends CrudService<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  public readonly entity = e.User;

  override listFilter(
    input: UserGetListInput,
    entity: ExtractDBType<typeof e.User>,
  ): any {
    return new Filters([e.op(e.User.is_deleted, '=', e.bool(false))])
      .addIf(!isEmpty(input.role_id), () =>
        e.op(entity['roles'].role.id, '=', e.cast(e.uuid, input.role_id)),
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
