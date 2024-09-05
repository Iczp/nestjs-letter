import { Injectable } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';
@Injectable()
export class PermissionsService {
  async seed() {
    // await this.seederService.seed();

    console.log('PermissionsService seed');

    const query = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e
          .insert(e.Permission, {
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

    const items = [
      { tag: '', name: 'admin', code: 'admin' },
      { tag: '', name: 'user', code: 'user' },
      { tag: '', name: 'zhongpei', code: 'zhongpei' },
      { tag: '', name: 'czp', code: 'czp' },
      { tag: '', name: '536d97c0602e', code: '536d97c0602e' },
    ];

    const result = await query.run(client, {
      items,
    });
    console.log(result);
  }
}
