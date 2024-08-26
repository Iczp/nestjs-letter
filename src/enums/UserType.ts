export enum UserTypeEnums {
  Unknown,
  Customer,
  ShopManager,
}

export const UserTypeKeys = Object.keys(UserTypeEnums).filter((key) =>
  isNaN(+key),
);

export const UserTypeValues = Object.values(UserTypeEnums);
