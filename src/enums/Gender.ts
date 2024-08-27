export enum GenderEnums {
  Unknown,
  Male,
  Female,
}

export const GenderKeys = Object.keys(GenderEnums).filter((key) => isNaN(+key));

export const GenderValues = Object.values(GenderEnums);
