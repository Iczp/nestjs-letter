import { Injectable } from '@nestjs/common';

import { createClient } from 'edgedb';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
// import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { UserDto } from './dtos/UserDto';
// import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { CrudService } from 'src/bases/CrudService';
import { UserDetailDto } from './dtos/UserDetailDto';

const client = createClient();

@Injectable()
export class UserService extends CrudService<
  UserDto,
  UserDetailDto,
  UserCreateInput,
  UserUpdateInput
> {
  public entityName: string = 'User';
  public entity: any = e.User;

  // async getItem(id: string) {
  //   const query = e.select(e.User, (entity) => ({
  //     ...e.User['*'],
  //     filter_single: e.op(entity.id, '=', e.uuid(id)),
  //   }));

  //   const result = await query.run(client);
  //   return result[0];
  // }
  // async getList(input: PagedRequestInput) {
  //   const totalCount = e.count(
  //     e.select(e.User, (entity) => ({
  //       filter: e.op(entity.is_deleted, '=', e.bool(false)),
  //     })),
  //   );

  //   console.log('totalCount', totalCount);

  //   const list = e.select(e.User, (entity) => ({
  //     ...entity['*'],
  //     offset: e.int64(input.skin),
  //     limit: e.int64(input.maxResultCount),
  //     filter: e.op(entity.is_deleted, '=', e.bool(false)),
  //     order_by: [
  //       {
  //         expression: entity.name,
  //         direction: e.ASC,
  //         empty: e.EMPTY_LAST,
  //       },
  //     ],
  //   }));

  //   // const entities = await query.run(client);
  //   const q = await e.select({ totalCount, list }).run(client);

  //   const items = q.list.map((item) => {
  //     return <UserDto>{
  //       name: item.name,
  //       userType: item.user_type,
  //       gender: item.gender,
  //       phone: item.phone,
  //       is_enabled: item.is_enabled,
  //     };
  //   });

  //   return new PagedResultDto<UserDto>(q.totalCount, items);
  // }

  async create(input: UserCreateInput) {
    const queryCreate = e.insert(e.User, {
      name: input.name,
      gender: input.gender,
      user_type: input.userType,
      phone: input.phone,
      is_enabled: input.is_enabled,
    });

    const queryDisplay = e.select(queryCreate, () => ({
      id: true,
      name: true,
      //   age: true,
      //   height: true,
      //   is_deceased: true,
    }));
    return await queryDisplay.run(client);
  }

  async update(id: string, input: UserUpdateInput) {
    // Return an empty list if no filter 'name' is provided.

    const queryUpdate = e.update(e.User, (user) => ({
      filter: e.op(user.id, '=', e.uuid(id)),
      set: {
        name: input.name ? input.name : user.name,
        phone: input.phone ? input.phone : user.phone,
        gender: input.gender ? input.gender : user.gender,
        last_modification_time: e.datetime_current(),
      },
    }));

    const queryDisplay = e.select(queryUpdate, (user) => ({
      ...e.User['*'],
      order_by: [
        {
          expression: user.name,
          direction: e.ASC,
          empty: e.EMPTY_LAST,
        },
      ],
    }));
    const result = await queryDisplay.run(client);
    return result[0];
    // return await this.getItem(id);
  }

  async delete(id: string) {
    // Return an empty list if no filter 'name' is provided.
    if (!id) {
      return;
    }
    const queryDelete = e.delete(e.User, (user) => ({
      filter: e.op(user.name, '=', id),
    }));
    const queryDisplay = e.select(queryDelete, (user) => ({
      id: true,
      // name: true,
      //   age: true,
      //   height: true,
      //   is_deceased: true,
      order_by: [
        {
          expression: user.name,
          direction: e.ASC,
          empty: e.EMPTY_LAST,
        },
      ],
    }));
    const result = await queryDisplay.run(client);
    console.log(result);
  }
}
