import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { BaseController } from './BaseController';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

import { ApiProperty } from '@nestjs/swagger';
import { IService } from './ICrudService';

export abstract class CrudBaseController extends BaseController {
  public service: IService;
  constructor() {
    super();
  }

  @ApiProperty({ description: '获取列表' })
  @Get('')
  async getList(
    @Query() input: PagedRequestInput,
  ): Promise<PagedResultDto<any>> {
    console.log(input);

    this.createQueryFilter();
    //...
    //...
    this.mapToDto();

    return this.service.getList(input);
  }

  mapToDto() {}
  createQueryFilter() {}

  @ApiProperty({ description: '获取单个' })
  @Get(':id')
  public async getItem(id: string) {
    return this.service.getItem(id);
  }

  @Post('')
  public async create(@Body() input: any) {
    console.log(input);
    return this.service.create(input);
  }

  @Put(':id')
  public async update(@Param() id: string, @Body() input: any) {
    console.log(id, input);
    return this.service.update(id, input);
  }

  @Delete(':id')
  public async delete(@Query('id') id: string) {
    console.log(id);
    await this.service.delete(id);
  }
}
