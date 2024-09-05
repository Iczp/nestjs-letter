import { Injectable, Logger } from '@nestjs/common';
import { client } from 'src/edgedb';
import e from 'dbschema/edgeql-js'; // auto-generated code

import * as permissionsConsts from '../permissions/permissionsConsts';

@Injectable()
export class SeedService {
  public async seed() {
    const roles = await this.seedRoles();

    const permissions = await this.seedPermissions();

    const adminPermissions = await this.seedAdminPermissions();

    return {
      message: `Seed Successfully`,
      result: {
        roles,
        permissions,
        adminPermissions,
      },
      date: new Date(),
    };
  }
  private async seedPermissions() {
    Logger.log('seedPermissions', 'SeedService');

    const rolePermisstion = e.params({ items: e.json }, (params) => {
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

    const result = await rolePermisstion.run(client, {
      items,
    });

    console.log(result);
    return result;
  }

  private async seedRoles() {
    Logger.log('seedRoles', 'SeedService');

    const role = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e
          .insert(e.Role, {
            name: e.cast(e.str, item.name),
            code: e.cast(e.str, item.code),
            is_static: e.cast(e.bool, item.is_static),
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

    const items = [{ is_static: true, name: 'admin', code: 'admin' }];

    const result = await role.run(client, {
      items,
    });

    console.log(result);

    return result;
  }

  private async seedAdminPermissions() {
    Logger.log('seedAdminPermissions', 'SeedService');

    // Fetch the 'admin' role
    const adminRole = (await e
      .select(e.Role, () => ({
        id: true,
        filter_single: { code: 'admin' },
      }))
      .run(client)) as unknown as { id: string };

    Logger.log(adminRole, 'SeedService');

    // Fetch all permissions
    const permissions = await e
      .select(e.Permission, () => ({
        id: true,
      }))
      .run(client);

    // Prepare rolePermissions data
    const rolePermissions = permissions.map((permission) => ({
      role: adminRole,
      permission: permission,
    }));

    Logger.log(rolePermissions, 'SeedService');

    // Perform bulk insert
    const query = e.params(
      {
        rolePermissions: e.json,
      },
      (params) => {
        return e.for(e.json_array_unpack(params.rolePermissions), (item) => {
          return e
            .insert(e.RolePermission, {
              permission: e.cast(e.Permission, item.permission),
              role: e.cast(e.Role, item.role),
            } as never)
            .unlessConflict((rp) => ({
              on: (rp.permission, rp.role),
              //   else: rp,
            }));
        });
      },
    );

    // Run the query
    const result = await query.run(client, { rolePermissions });

    console.log(result);

    return result;
  }
}
