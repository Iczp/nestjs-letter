import { Injectable } from '@nestjs/common';

import { createClient } from 'edgedb';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { User } from 'dbschema/interfaces'; // auto-generated code
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
const client = createClient();

@Injectable()
export class UserService {
  async getItem(id: string) {
    const query = e.select(e.User, (entity) => ({
      ...e.User['*'],
      filter_single: e.op(entity.id, '=', e.uuid(id)),
    }));

    const result = await query.run(client);
    return result;
  }
  async getList(name?: string, maxResultCount = 10, skipCount = 0) {
    const totalCount = e.count(e.User);
    console.log('totalCount', totalCount);
    const query = e.select(e.User, (user) => ({
      ...e.User['*'],
      offset: e.int64(skipCount),
      limit: e.int64(maxResultCount),
      filter: e.op(user.is_deleted, '=', e.bool(false)),
      order_by: [
        {
          expression: user.name,
          direction: e.ASC,
          empty: e.EMPTY_LAST,
        },
      ],
    }));

    const list = await query.run(client);
    return list;
  }

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
    if (!id) {
      return [];
    }
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

    return await queryDisplay.run(client);
    // return await this.getItem(id);
  }

  async delete(name: string) {
    // Return an empty list if no filter 'name' is provided.
    if (!name) {
      return [];
    }
    const queryDelete = e.delete(e.User, (user) => ({
      filter: e.op(user.name, '=', name),
    }));
    const queryDisplay = e.select(queryDelete, (user) => ({
      id: true,
      name: true,
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

    return await queryDisplay.run(client);
  }
}
