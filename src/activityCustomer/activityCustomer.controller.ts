import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityCustomerService } from './activityCustomer.service';

import { CrudController } from 'src/bases/CrudController';
import { ActivityCustomerDto } from './dtos/ActivityCustomerDto';
import { ActivityCustomerDetailDto } from './dtos/ActivityCustomerDetailDto';
import { ActivityCustomerCreateInput } from './dtos/ActivityCustomerCreateInput';
import { ActivityCustomerUpdateInput } from './dtos/ActivityCustomerUpdateInput';
import { ActivityCustomerGetListInput } from './dtos/ActivityCustomerGetListInput';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { Response } from 'express';

@Controller('activity-customer')
@ApiTags('ActivityCustomer')
export class ActivityCustomerController extends CrudController<
  ActivityCustomerDto,
  ActivityCustomerDetailDto,
  ActivityCustomerGetListInput,
  ActivityCustomerCreateInput,
  ActivityCustomerUpdateInput
> {
  constructor(readonly service: ActivityCustomerService) {
    super(service);
  }

  @Get()
  @ApiOperation({ summary: '[活动客户]列表' })
  public override getList(
    input: ActivityCustomerGetListInput,
  ): Promise<PagedResultDto<ActivityCustomerDto>> {
    return super.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '[活动客户]详情' })
  public override getItem(
    @Param('id') id: string,
  ): Promise<ActivityCustomerDetailDto> {
    return super.getItem(id);
  }

  @Post()
  @ApiOperation({ summary: '创建[活动客户]' })
  public override create(
    @Body() input: ActivityCustomerCreateInput,
  ): Promise<ActivityCustomerDetailDto> {
    return super.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改[活动客户]' })
  public override update(
    @Param('id') id: string,
    input: ActivityCustomerUpdateInput,
  ): Promise<ActivityCustomerDetailDto> {
    return super.update(id, input);
  }

  @Post('checked/:id')
  @ApiOperation({ summary: '设置 是否签到' })
  public setIsChecked(
    @Param('id') id: string,
    @Query('is_checked') is_checked: boolean,
  ) {
    return this.service.updateEntity(id, { is_checked });
  }

  @Post('invited/:id')
  @ApiOperation({ summary: '设置 是否已邀请' })
  public setIsActived(
    @Param('id') id: string,
    @Query('is_invited') is_invited: boolean,
  ) {
    return this.service.updateEntity(id, { is_invited: is_invited });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除[活动客户]' })
  public override delete(id: string): Promise<void> {
    return super.delete(id);
  }

  @Get('excel/output')
  @ApiOperation({
    summary: '[活动客户]导出 excel',
    description: '导出excel 单次导出数据不能太多',
  })
  public override exportExcel(
    @Res() res: Response,
    @Query() input: ActivityCustomerGetListInput,
  ): Promise<void> {
    return super.exportExcel(res, input);
  }
}
