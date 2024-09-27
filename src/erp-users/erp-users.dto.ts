import { ApiProperty } from '@nestjs/swagger';
import { GetListInput } from 'src/bases/GetListInput';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class ErpUsersDto {
  @ApiProperty({
    description: 'id',
  })
  id: string;

  @ApiProperty({
    description: 'name',
  })
  name?: string;

  @ApiProperty({
    description: 'employeeNo',
  })
  employeeNo?: string;

  @ApiProperty({
    description: 'organizationId',
  })
  organizationId?: string;

  @ApiProperty({
    description: 'http_status',
  })
  organizationName?: string;

  @ApiProperty({
    description: 'departmentId',
  })
  departmentId?: string;

  @ApiProperty({
    description: 'departmentName',
  })
  departmentName?: string;

  @ApiProperty({
    description: 'departmentShortName',
  })
  departmentShortName?: string;

  @ApiProperty({
    description: 'departmentEnCode',
  })
  departmentEnCode?: string;

  @ApiProperty({
    description: 'parentDeptId',
  })
  parentDeptId?: string;

  @ApiProperty({
    description: 'parentDeptName',
  })
  parentDeptName?: string;

  @ApiProperty({
    description: 'parentDeptShortName',
  })
  parentDeptShortName?: string;

  @ApiProperty({
    description: 'grade',
  })
  grade?: string;

  @ApiProperty({
    description: 'employmentStatusName',
  })
  employmentStatusName?: string;

  @ApiProperty({
    description: 'employmentStatusId',
  })
  employmentStatusId?: string;

  @ApiProperty({
    description: 'headImage',
  })
  headImage?: string;

  @ApiProperty({
    description: 'http_status',
  })
  jobType?: number;

  @ApiProperty({
    description: 'mobile',
  })
  mobile?: string;

  @ApiProperty({
    description: 'spelling',
  })
  spelling?: string;

  @ApiProperty({
    description: 'simpleSpelling',
  })
  simpleSpelling?: string;

  @ApiProperty({
    description: 'spellingFlag',
  })
  spellingFlag?: string;

  @ApiProperty({
    description: 'gender',
  })
  gender?: string;
}

export class ErpUsersGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: 'http_status',
  })
  http_status?: number;
}

export class ErpUsersPagedResult extends PagedResult {
  constructor(totalCount: number, items: ErpUsersDto[]) {
    super(totalCount, items);
  }
  @ApiProperty({
    type: [ErpUsersDto],
  })
  public override items: ErpUsersDto[];
}
