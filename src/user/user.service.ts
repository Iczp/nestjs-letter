/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import e, { is } from 'dbschema/edgeql-js'; // auto-generated code
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
import { UserDto } from './dtos/UserDto';
import { CrudService } from 'src/bases/CrudService';
import { UserDetailDto } from './dtos/UserDetailDto';
import { UserGetListInput } from './dtos/UserGetListInput';
import { $expr_Operator } from 'dbschema/edgeql-js/funcops';
import { $bool } from 'dbschema/edgeql-js/modules/std';
import { ObjectTypeExpression } from 'dbschema/edgeql-js/reflection';
import { Cardinality } from 'edgedb/dist/reflection';
import { UserTypeKeys } from 'src/enums/UserType';
import { GenderKeys } from 'src/enums/Gender';
import { AddIf } from 'src/common/AddIf';
import { PromiseResult } from 'src/types/PromiseResult';

// dep = {
//   name: true,
//   users: {
//     name: true,
//     phone: true,
//     user_type: true,
//   },
// };

@Injectable()
export class UserService extends CrudService<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  // constructor() {
  //   super(e.User);
  // }
  public readonly entity = e.User;

  override listFilter(input: UserGetListInput): any {
    const fi = new AddIf([e.op(e.User.is_deleted, '=', e.bool(false))])
      .addIf(
        UserTypeKeys.includes(input.userType),
        e.op(e.User.user_type, '=', e.cast(e.UserType, input.userType)),
      )
      .addIf(
        GenderKeys.includes(input.gender),
        e.op(e.User.gender, '=', e.cast(e.Gender, input.gender)),
      )
      .addIf(
        input.is_enabled !== undefined,
        e.op(e.User.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .toArray();

    return e.all(e.set(...fi));
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
