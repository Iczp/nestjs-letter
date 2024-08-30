import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  async getList(@Query() input: TGetListInput): Promise<PagedResultDto<TDto>> {
    console.log(input);
    return this.service.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个', description: '获取单个' })
  public async getItem(@Param('id') id: string): Promise<TDetailDto> {
    return this.service.getItem(id);
  }

  @Post('')
  @ApiOperation({ summary: '新增', description: `` })
  public async create(@Body() input: TCreateInput): Promise<TDetailDto> {
    console.log(input);
    return this.service.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改', description: `` })
  public async update(
    @Param('id') id: string,
    @Body() input: TUpdateInput,
  ): Promise<TDetailDto> {
    console.log(id, input);
    return this.service.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: `` })
  public async delete(@Query('id') id: string) {
    console.log(id);
    await this.service.delete(id);
  }
}
