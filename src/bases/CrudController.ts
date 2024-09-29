import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

import { ApiOperation } from '@nestjs/swagger';
import { ICrudService } from './ICrudService';
import { ExcelController } from './ExcelController';
export abstract class CrudController<
  TDto,
  TDetailDto,
  TGetListInput extends object,
  TCreateInput,
  TUpdateInput,
> extends ExcelController<TGetListInput> {
  protected Policy_GetItem?: string;
  protected Policy_GetList?: string;
  protected Policy_Create?: string;
  protected Policy_Update?: string;
  protected Policy_Delete?: string;
  protected Policy_Set_IsEnabled?: string;

  // implements ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  // public readonly service: IService;
  constructor(
    readonly service: ICrudService<
      TDto,
      TDetailDto,
      TGetListInput,
      TCreateInput,
      TUpdateInput
    >,
  ) {
    super(service);
    // this.service = service;
  }

  @Get('')
  @ApiOperation({ summary: '获取列表', description: '获取列表' })
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() input: TGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<TDto>> {
    console.log(input);
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_GetList);
    return this.service.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个', description: '获取单个' })
  @HttpCode(HttpStatus.OK)
  public async getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<TDetailDto> {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_GetItem);
    return this.service.getItem(id);
  }

  @Post('enabled/:id')
  @ApiOperation({ summary: '启用/禁用', description: '启用/禁用' })
  public async setIsEnabled(
    @Param('id') id: string,
    @Query('is_enabled') is_enabled: boolean,
    @Req() req: any,
  ): Promise<any> {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Set_IsEnabled);
    return this.service.updateEntity(id, { is_enabled });
  }

  @Post('')
  @ApiOperation({ summary: '新增', description: `` })
  public async create(
    @Body() input: TCreateInput,
    @Req() req: any,
  ): Promise<TDetailDto> {
    console.log(input);
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Create);
    return this.service.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改', description: `` })
  public async update(
    @Param('id') id: string,
    @Body() input: TUpdateInput,
    @Req() req: any,
  ): Promise<TDetailDto> {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Update);
    console.log(id, input);
    return this.service.update(id, input);
  }

  // @Delete(':id')
  @ApiOperation({ summary: '删除', description: `` })
  public async delete(@Query('id') id: string | string[], @Req() req: any) {
    console.log(id);
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Delete);
    await this.service.delete(id);
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  public async deleteMany(
    @Query('id') id: string[],
    @Req() req: any,
  ): Promise<void> {
    console.log(id);
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Delete);
    await this.service.delete(id);
  }
}
