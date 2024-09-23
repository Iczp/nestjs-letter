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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CrudController } from 'src/bases/CrudController';
// import { Auditing } from 'src/audits/audits.decorator';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityPagedResult,
  ActivityUpdateInput,
} from './activities.dto';
import { AcitvitiesPermissions } from 'src/app.permissions';
import { CurrentUserApiTags } from 'src/app.consts';

@Controller('activities')
@ApiTags('Activities 活动管理')
// @Auditing(false)
export class ActivitiesController extends CrudController<
  ActivityDto,
  ActivityDetailDto,
  ActivityGetListInput,
  ActivityCreateInput,
  ActivityUpdateInput
> {
  override Policy_GetItem = AcitvitiesPermissions.Activity_GetItem;
  override Policy_GetList = AcitvitiesPermissions.Activity_GetList;
  override Policy_Create = AcitvitiesPermissions.Activity_Create;
  override Policy_Update = AcitvitiesPermissions.Activity_Update;
  override Policy_Delete = AcitvitiesPermissions.Activity_Delete;
  override Policy_Set_IsEnabled = AcitvitiesPermissions.Activity_Set_IsEnabled;
  override Policy_Excel_Import = AcitvitiesPermissions.Activity_Excel_Import;
  override Policy_Excel_Ouput = AcitvitiesPermissions.Activity_Excel_Ouput;
  override Policy_Excel_Tpl = AcitvitiesPermissions.Activity_Excel_Tpl;

  protected Policy_GetList_ByCurrentUser =
    AcitvitiesPermissions.Activity_GetList_ByCurrentUser;
  constructor(private readonly activitiesService: ActivitiesService) {
    super(activitiesService);
  }
  @Get()
  @ApiOperation({ summary: '活动列表' })
  // @Auditing(false)
  public override getList(
    input: ActivityGetListInput,
    @Req() req: any,
  ): Promise<ActivityPagedResult> {
    return super.getList(input, req);
  }

  @Get('current-user/list')
  @ApiOperation({ summary: '活动列表' })
  // @Auditing(false)
  @ApiTags(CurrentUserApiTags)
  public async getListByCurrentUser(
    @Req() req: any,
  ): Promise<ActivityPagedResult> {
    const currentUser = req.user;
    await this.checkPolicyName(req, this.Policy_GetList_ByCurrentUser);
    return await this.activitiesService.getListByUserId(currentUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '活动详情' })
  public override getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<ActivityDetailDto> {
    return super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建活动' })
  public override create(
    @Body() input: ActivityCreateInput,
    @Req() req: any,
  ): Promise<ActivityDetailDto> {
    return super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改活动' })
  public override update(
    @Param('id') id: string,
    input: ActivityUpdateInput,
    @Req() req: any,
  ): Promise<ActivityDetailDto> {
    return super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除活动' })
  public override delete(id: string, @Req() req: any): Promise<void> {
    return super.delete(id, req);
  }
}
