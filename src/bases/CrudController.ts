import { BaseController } from './BaseController';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

import { ApiOperation } from '@nestjs/swagger';
import { IService } from './ICrudService';

export abstract class CrudController<
  TDto,
  TDetailDto,
  TGetListInput extends object,
  TCreateInput,
  TUpdateInput,
> extends BaseController {
  // implements ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  // public service: IService;
  constructor(private readonly serv: IService) {
    super();
    // this.service = _service;
  }

  @Get('')
  @ApiOperation({ summary: '获取列表', description: '获取列表' })
  async getList(@Query() input: TGetListInput): Promise<PagedResultDto<TDto>> {
    console.log(input);
    return this.serv.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个', description: '获取单个' })
  public async getItem(@Param('id') id: string): Promise<TDetailDto> {
    return this.serv.getItem(id);
  }

  @Post('')
  @ApiOperation({ summary: '新增', description: `` })
  public async create(@Body() input: TCreateInput): Promise<TDetailDto> {
    console.log(input);
    return this.serv.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改', description: `` })
  public async update(
    @Param('id') id: string,
    @Body() input: TUpdateInput,
  ): Promise<TDetailDto> {
    console.log(id, input);
    return this.serv.update(id, input);
  }

  @ApiOperation({ summary: '删除', description: `` })
  @Delete(':id')
  public async delete(@Query('id') id: string) {
    console.log(id);
    await this.serv.delete(id);
  }
}
