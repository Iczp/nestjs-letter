import {
  Body,
  Controller,
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
  ActivityCustomerPagedResult,
  ActivityCustomerUpdateInput,
} from './activity-customer.dto';
import { Response } from 'express';
import { AcitvitiyCustomersPermissions } from 'src/app.permissions';
import { e } from 'src/edgedb';

@Controller('activity-customer')
@ApiTags('ActivityCustomer 活动客户管理')
export class ActivityCustomerController extends CrudController<
  ActivityCustomerDto,
  ActivityCustomerDetailDto,
  ActivityCustomerGetListInput,
  ActivityCustomerCreateInput,
  ActivityCustomerUpdateInput
> {
  override Policy_GetItem =
    AcitvitiyCustomersPermissions.ActivityCustomer_GetItem;
  override Policy_GetList =
    AcitvitiyCustomersPermissions.ActivityCustomer_GetList;
  override Policy_Create =
    AcitvitiyCustomersPermissions.ActivityCustomer_Create;
  override Policy_Update =
    AcitvitiyCustomersPermissions.ActivityCustomer_Update;
  override Policy_Delete =
    AcitvitiyCustomersPermissions.ActivityCustomer_Delete;
  override Policy_Set_IsEnabled =
    AcitvitiyCustomersPermissions.ActivityCustomer_Set_IsEnabled;
  override Policy_Excel_Import =
    AcitvitiyCustomersPermissions.ActivityCustomer_Excel_Import;
  override Policy_Excel_Ouput =
    AcitvitiyCustomersPermissions.ActivityCustomer_Excel_Ouput;
  override Policy_Excel_Tpl =
    AcitvitiyCustomersPermissions.ActivityCustomer_Excel_Tpl;

  protected Policy_Set_IsChecked =
    AcitvitiyCustomersPermissions.ActivityCustomer_Set_IsChecked;

  protected Policy_Set_IsGifted =
    AcitvitiyCustomersPermissions.ActivityCustomer_Set_IsGifed;

  protected Policy_Set_IsInvited =
    AcitvitiyCustomersPermissions.ActivityCustomer_Set_IsInvited;

  protected Policy_Set_IsSigned =
    AcitvitiyCustomersPermissions.ActivityCustomer_Set_IsSigned;
  protected Policy_Get_Letter =
    AcitvitiyCustomersPermissions.ActivityCustomer_Get_Letter;

  constructor(readonly service: ActivityCustomerService) {
    super(service);
  }

  @Get()
  @ApiOperation({ summary: '[活动客户]列表' })
  public override getList(
    input: ActivityCustomerGetListInput,
    @Req() req: any,
  ): Promise<ActivityCustomerPagedResult> {
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
  @ApiOperation({ summary: '设置 是否审核' })
  public setIsChecked(
    @Param('id') id: string,
    @Query('is_checked') is_checked: boolean,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    this.checkPolicyName(req, this.Policy_Set_IsChecked);
    return this.service.updateEntity(id, {
      is_checked,
      check_time: e.datetime_current(),
    });
  }

  @Post('invited/:id')
  @ApiOperation({ summary: '设置 是否已邀请' })
  public setIsInvited(
    @Param('id') id: string,
    @Query('is_invited') is_invited: boolean,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    this.checkPolicyName(req, this.Policy_Set_IsInvited);
    return this.service.updateEntity(id, {
      is_invited,
      invite_time: e.datetime_current(),
    });
  }

  @Post('gifted/:id')
  @ApiOperation({ summary: '设置 是否赠送礼品' })
  public setIsIsGifted(
    @Param('id') id: string,
    @Query('is_gifted') is_gifted: boolean,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    this.checkPolicyName(req, this.Policy_Set_IsGifted);
    return this.service.updateEntity(id, {
      is_gifted,
      gift_time: e.datetime_current(),
    });
  }

  @Post('gifted/:id')
  @ApiOperation({ summary: '设置 是否签到' })
  public setIsIsSigned(
    @Param('id') id: string,
    @Query('is_signed') is_signed: boolean,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    this.checkPolicyName(req, this.Policy_Set_IsSigned);
    return this.service.updateEntity(id, {
      is_signed,
      sign_time: e.datetime_current(),
    });
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

  private async resImage({
    res,
    fileName,
    attachment = false,
  }: {
    res: Response;
    fileName: string;
    attachment?: boolean;
  }) {
    const formatFileName = encodeURIComponent(fileName).replace(
      /[!'()*]/g,
      (c) => '%' + c.charCodeAt(0).toString(16),
    );
    // attachment;
    const headers = {
      'Content-Type': 'image/png',
      'Content-Disposition': `${attachment ? 'attachment;' : ''} filename="${formatFileName}";`,
    };
    Object.entries(headers).forEach((item) => {
      res.setHeader(item[0], item[1]);
    });
  }

  @Get('letter/:id')
  @ApiOperation({ summary: '邀请函', description: `邀请函图片` })
  public async letter(
    @Res() res: Response,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Get_Letter);
    const { filename, buffer } = await this.service.generateLetter(id);
    this.resImage({ res, fileName: filename });
    res.end(buffer, 'binary'); // 使用 'binary' 编码发送 Buffer
    res.end();
  }
}
