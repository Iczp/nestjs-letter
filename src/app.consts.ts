import * as ModulesPermisstions from './app.permisstions';

export const AppPermisstions = ModulesPermisstions;

export const AppPermisstionItems = Object.entries(AppPermisstions).flatMap(
  ([module, moduleValue]) => {
    // console.log('module', module, moduleValue);
    return Object.entries(moduleValue).map(([name, code]) => ({
      module,
      name,
      code,
    }));
  },
);

export const AppPermisstionsObject = AppPermisstionItems.reduce(
  (acc, { code, ...rest }) => {
    acc[code] = rest;
    return acc;
  },
  {},
);
