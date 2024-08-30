export enum GenderEnums {
  Unknown = 'Unknown',
  Male = 'Male',
  Female = 'Female',
}

export const GenderText = {
  Unknown: '未知',
  Male: '男',
  Female: '女',
};

export const GenderKeys = Object.keys(GenderEnums).filter((key) => isNaN(+key));

export const GenderValues = Object.values(GenderEnums);
