export type PermissionType = {
  group: string;
  code: string;
  name: string;
};

export class PermissionDefinition {
  private array: PermissionType[] = [];

  constructor(initialArray: PermissionType[] = []) {
    this.array = initialArray;
  }

  add(group: string, code: string, name: string) {
    if (this.array.find((item) => item.code === code)) {
      throw new Error(`Permission with code ${code} already exists`);
    }
    this.array.push({
      group,
      code,
      name,
    });
    return this;
  }

  toArray() {
    return this.array;
  }
}
