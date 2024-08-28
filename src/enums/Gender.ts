export enum GenderEnums {
  Unknown = 'Unknown',
  Male = 'Male',
  Female = 'Female',
}

export const GenderKeys = Object.keys(GenderEnums).filter((key) => isNaN(+key));

export const GenderValues = Object.values(GenderEnums);
