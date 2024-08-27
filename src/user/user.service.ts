import { Injectable } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
import { UserDto } from './dtos/UserDto';
import { CrudService } from 'src/bases/CrudService';
import { UserDetailDto } from './dtos/UserDetailDto';

@Injectable()
export class UserService extends CrudService<
  UserDto,
  UserDetailDto,
  UserCreateInput,
  UserUpdateInput
> {
  public entityName: string = 'User';
  public entity: any = e.User;

  public override mapToUpdateEntity(
    entity: any,
    input: UserUpdateInput,
  ): { [x: string]: any } {
    return {
      name: input.name ? input.name : entity.name,
      phone: input.phone ? input.phone : entity.phone,
      gender: input.gender ? input.gender : entity.gender,
    };
  }

  public override mapToCreateEntity(
    entity: any,
    input: UserCreateInput,
  ): { [x: string]: any } {
    return {
      name: input.name,
      gender: input.gender,
      user_type: input.userType,
      phone: input.phone,
      is_enabled: input.is_enabled,
    };
  }
}
