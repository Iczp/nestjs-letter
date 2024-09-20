import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ActivityCustomerInvitersCreateInput,
  ActivityCustomerInvitersDetailDto,
  ActivityCustomerInvitersDto,
  ActivityCustomerInvitersGetListInput,
  ActivityCustomerInvitersUpdateInput,
} from './activity-customer-inviters.dto';
import { CrudController } from 'src/bases/CrudController';
import { ActivityCustomerInvitersService } from './activity-customer-inviters.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import * as ActivityCustomerInvitersPermissions from './activity-customer-inviters.permissions';

@Controller('activity-customer-inviters')
@ApiTags('ActivityCustomerInviters 活动客户管理(登录用户)')
export class ActivityCustomerInvitersController extends CrudController<
  ActivityCustomerInvitersDto,
  ActivityCustomerInvitersDetailDto,
  ActivityCustomerInvitersGetListInput,
  ActivityCustomerInvitersCreateInput,
  ActivityCustomerInvitersUpdateInput
> {
  override Policy_GetItem =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_GetItem;
  override Policy_GetList =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_GetList;
  override Policy_Create =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Create;
  override Policy_Update =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Update;
  override Policy_Delete =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Delete;
  override Policy_Set_IsEnabled =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Set_IsEnabled;
  override Policy_Excel_Import =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Excel_Import;
  override Policy_Excel_Ouput =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Excel_Ouput;
  override Policy_Excel_Tpl =
    ActivityCustomerInvitersPermissions.ActivityCustomerInviters_Excel_Tpl;

  constructor(
    private readonly activityCustomerInvitersService: ActivityCustomerInvitersService,
  ) {
    super(activityCustomerInvitersService);
  }

  @Get()
  @ApiOperation({ summary: '客户列表' })
  @ApiOkResponse({ type: [ActivityCustomerInvitersDto] })
  public override async getList(
    input: ActivityCustomerInvitersGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<ActivityCustomerInvitersDto>> {
    return await super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '客户详情' })
  @ApiOkResponse({ type: ActivityCustomerInvitersDetailDto })
  public override async getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<ActivityCustomerInvitersDetailDto> {
    return await super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建客户' })
  @ApiOkResponse({ type: ActivityCustomerInvitersDetailDto })
  public override async create(
    @Body() input: ActivityCustomerInvitersCreateInput,
    @Req() req: any,
  ): Promise<ActivityCustomerInvitersDetailDto> {
    return await super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改客户' })
  @ApiOkResponse({ type: ActivityCustomerInvitersDetailDto })
  public override async update(
    @Param('id') id: string,
    input: ActivityCustomerInvitersUpdateInput,
    @Req() req: any,
  ): Promise<ActivityCustomerInvitersDetailDto> {
    return await super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除客户' })
  public override async delete(id: string, @Req() req: any): Promise<void> {
    return await super.delete(id, req);
  }
}
