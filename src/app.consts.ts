import * as ModulesPermissions from './app.permissions';

export const AppPermissions = ModulesPermissions;

export const AppPermissionItems = Object.entries(AppPermissions).flatMap(
  ([module, moduleValue]) => {
    // console.log('module', module, moduleValue);
    return Object.entries(moduleValue).map(([name, code]) => ({
      module,
      name,
      code,
    }));
  },
);

export const AppPermissionsObject = AppPermissionItems.reduce(
  (acc, { code, ...rest }) => {
    acc[code] = rest;
    return acc;
  },
  {},
);
export const AppPermissionsKeys = Object.keys(AppPermissionsObject);

export const CurrentUserApiTags = 'CurrentUser 当前用户 API';
