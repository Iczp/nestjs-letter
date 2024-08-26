export enum GenderEnums {
  Unset,
  Male,
  Female,
}

export const GenderKeys = Object.keys(GenderEnums).filter((key) => isNaN(+key));

export const GenderValues = Object.values(GenderEnums);
