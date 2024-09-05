import { Injectable, Logger } from '@nestjs/common';
import { client } from 'src/edgedb';
import e from 'dbschema/edgeql-js'; // auto-generated code

import * as permissionsConsts from '../permissions/permissionsConsts';

@Injectable()
export class SeedService {
  public async seed() {
    Logger.log('PermissionsService seed', 'SeedService');

    const query = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e
          .insert(e.Permission, {
            tag: e.cast(e.str, item.tag),
            name: e.cast(e.str, item.name),
            code: e.cast(e.str, item.code),
          })
          .unlessConflict((entity) => ({
            on: entity.code,
            // else: e.update(e.Permission, () => ({
            //   filter_single: { code: e.cast(e.str, item.code) },
            //   set: {
            //     // name: e.op(e.cast(e.str, item.name), '++', 'dd'),
            //     last_modification_time: e.datetime_current(),
            //   },
            // })),
          }));
      });
    });

    const items = Object.entries(permissionsConsts).map(([key, value]) => ({
      tag: '',
      name: key,
      code: value,
    }));

    const result = await query.run(client, {
      items,
    });

    console.log(result);
    return {
      message: `Seed Successfully`,
      result,
      items,
      date: new Date(),
    };
  }
}
