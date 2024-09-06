import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';
import { RoleDto } from './dtos/RoleDto';
import { RoleDetailDto } from './dtos/RoleDetailDto';
import { RoleGetListInput } from './dtos/RoleGetListInput';
import { RoleCreateInput } from './dtos/RoleCreateInput';
import { RoleUpdateInput } from './dtos/RoleUpdateInput';
import e from 'dbschema/edgeql-js'; // auto-generated code
@Injectable()
export class RolesService extends CrudService<
  RoleDto,
  RoleDetailDto,
  RoleGetListInput,
  RoleCreateInput,
  RoleUpdateInput
> {
  public readonly entity = e.Role;
}
