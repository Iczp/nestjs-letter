
import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { BaseController } from './BaseController';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

export class CrudBaseController extends BaseController {
  constructor() {
    super();
  }

  @Get('')
  async getList(@Query() input: PagedRequestInput) {
    console.log(input);
  }

  @Get(':id')
  async getItem(@Param() id: string) {
    console.log(id);
  }

  @Post('')
  async create(@Body() input: any) {
    console.log(input);
  }

  @Put(':id')
  async upate(@Param() id: string, @Body() input: any) {
    console.log(id, input);
  }

  @Delete(':id')
  async delete(@Query('id') id: string) {
    console.log(id);
  }
}
