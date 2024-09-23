import { ApiProperty } from '@nestjs/swagger';
import { GetListInput } from 'src/bases/GetListInput';
import { BaseEntityDto } from 'src/dtos/BaseEntityDto';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class AuditLogDto extends BaseEntityDto {
  @ApiProperty({ description: '应用名称' })
  app_name: string;

  @ApiProperty({ description: '用户Id' })
  user_id: string;

  @ApiProperty({ description: '用户名称' })
  user_name: string;

  @ApiProperty({ description: '客户端ID' })
  client_id: string;

  @ApiProperty({ description: '客户端名称' })
  client_name: string;

  @ApiProperty({ description: 'IP地址' })
  ip: string;

  @ApiProperty({ description: '浏览器信息' })
  browser_info: string;

  @ApiProperty({ description: 'HOST' })
  host: string;

  @ApiProperty({ description: 'URL' })
  url: string;

  @ApiProperty({ description: 'HTTP请求方式' })
  http_method: string;

  @ApiProperty({ description: 'HTTP状态码' })
  http_status: string;

  @ApiProperty({ description: '服务名称' })
  class_name: string;

  @ApiProperty({ description: '方法名称' })
  handler_name: string;

  @ApiProperty({ description: 'Headers' })
  headers: string;

  @ApiProperty({ description: 'Referer' })
  referer: string;

  @ApiProperty({ description: 'Accept Language' })
  accept_language: string;

  @ApiProperty({ description: 'Accept Encoding' })
  accept_encoding: string;

  @ApiProperty({ description: 'Data' })
  data: string;

  @ApiProperty({ description: '执行时长' })
  duration: string;

  @ApiProperty({ description: '执行时间' })
  excution_time: string;
}

export class AuditLogUpdateInput {}

export class AuditLogCreateInput extends AuditLogDto {}

export class AuditLogDetailDto extends AuditLogDto {}

export class AuditLogGetListInput extends GetListInput {
  @ApiProperty({
    required: false,
    description: 'http_status',
  })
  http_status?: number;

  @ApiProperty({
    required: false,
    description: 'http_status',
  })
  start_http_status?: number;

  @ApiProperty({
    required: false,
    description: 'http_status',
  })
  end_http_status?: number;

  @ApiProperty({
    required: false,
    description: 'http_method',
  })
  http_method?: string;

  @ApiProperty({
    required: false,
    description: 'client_id',
  })
  client_id?: string;

  @ApiProperty({
    required: false,
    description: 'user_id',
  })
  user_id?: string;

  @ApiProperty({
    required: false,
    description: 'class_name',
  })
  class_name?: string;

  @ApiProperty({
    required: false,
    description: 'handler_name',
  })
  handler_name?: string;

  @ApiProperty({
    required: false,
    description: 'IP',
  })
  ip?: string;
}

export class AuditLogPagedResult extends PagedResult {
  constructor(totalCount: number, items: AuditLogDto[]) {
    super(totalCount, items);
  }
  override items: AuditLogDto[];
}
