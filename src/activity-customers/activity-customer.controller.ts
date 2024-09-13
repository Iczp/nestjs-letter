import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityCustomerService } from './activity-customer.service';

import { CrudController } from 'src/bases/CrudController';
import {
  ActivityCustomerCreateInput,
  ActivityCustomerDetailDto,
  ActivityCustomerDto,
  ActivityCustomerGetListInput,
  ActivityCustomerUpdateInput,
} from './activity-customer.dto';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { Response } from 'express';
import { AcitvitiyCustomersPermisstions } from 'src/app.permisstions';

@Controller('activity-customer')
@ApiTags('ActivityCustomer')
export class ActivityCustomerController extends CrudController<
  ActivityCustomerDto,
  ActivityCustomerDetailDto,
  ActivityCustomerGetListInput,
  ActivityCustomerCreateInput,
  ActivityCustomerUpdateInput
> {
  override Policy_GetItem =
    AcitvitiyCustomersPermisstions.ActivityCustomer_GetItem;
  override Policy_GetList =
    AcitvitiyCustomersPermisstions.ActivityCustomer_GetList;
  override Policy_Create =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Create;
  override Policy_Update =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Update;
  override Policy_Delete =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Delete;
  override Policy_Set_IsEnabled =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Set_IsEnabled;
  override Policy_Excel_Import =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Excel_Import;
  override Policy_Excel_Ouput =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Excel_Ouput;
  override Policy_Excel_Tpl =
    AcitvitiyCustomersPermisstions.ActivityCustomer_Excel_Tpl;
  constructor(readonly service: ActivityCustomerService) {
    super(service);
  }

  @Get()
  @ApiOperation({ summary: '[活动客户]列表' })
  public override getList(
    input: ActivityCustomerGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<ActivityCustomerDto>> {
    return super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '[活动客户]详情' })
  public override getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<ActivityCustomerDetailDto> {
    return super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建[活动客户]' })
  public override create(
    @Body() input: ActivityCustomerCreateInput,
    @Req() req: any,
  ): Promise<ActivityCustomerDetailDto> {
    return super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改[活动客户]' })
  public override update(
    @Param('id') id: string,
    input: ActivityCustomerUpdateInput,
    @Req() req: any,
  ): Promise<ActivityCustomerDetailDto> {
    return super.update(id, input, req);
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
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    return this.service.updateEntity(id, { is_invited: is_invited });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除[活动客户]' })
  public override delete(id: string, @Req() req: any): Promise<void> {
    return super.delete(id, req);
  }

  @Get('excel/output')
  @ApiOperation({
    summary: '[活动客户]导出 excel',
    description: '导出excel 单次导出数据不能太多',
  })
  public override exportExcel(
    @Res() res: Response,
    @Query() input: ActivityCustomerGetListInput,
    @Req() req: any,
  ): Promise<void> {
    return super.exportExcel(res, input, req);
  }

  // @Post('excel/import')
  // override importExcel(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Query() query: any,
  //   @Body() body: any,
  // ): Promise<ExcelImportResult> {
  //   return super.importExcel(file, query, body);
  // }
}
