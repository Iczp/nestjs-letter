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
import { PagedResultDto } from 'src/dtos/PagedResultDto';
// import { Auditing } from 'src/audits/audits.decorator';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityUpdateInput,
} from './activities.dto';
import { AcitvitiesPermisstions } from 'src/app.permisstions';

@Controller('activities')
@ApiTags('Activities')
// @Auditing(false)
export class ActivitiesController extends CrudController<
  ActivityDto,
  ActivityDetailDto,
  ActivityGetListInput,
  ActivityCreateInput,
  ActivityUpdateInput
> {
  override Policy_GetItem = AcitvitiesPermisstions.Activity_GetItem;
  override Policy_GetList = AcitvitiesPermisstions.Activity_GetList;
  override Policy_Create = AcitvitiesPermisstions.Activity_Create;
  override Policy_Update = AcitvitiesPermisstions.Activity_Update;
  override Policy_Delete = AcitvitiesPermisstions.Activity_Delete;
  override Policy_Set_IsEnabled = AcitvitiesPermisstions.Activity_Set_IsEnabled;
  override Policy_Excel_Import = AcitvitiesPermisstions.Activity_Excel_Import;
  override Policy_Excel_Ouput = AcitvitiesPermisstions.Activity_Excel_Ouput;
  override Policy_Excel_Tpl = AcitvitiesPermisstions.Activity_Excel_Tpl;
  constructor(private readonly userService: ActivitiesService) {
    super(userService);
  }
  @Get()
  @ApiOperation({ summary: '活动列表' })
  // @Auditing(false)
  public override getList(
    input: ActivityGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<ActivityDto>> {
    return super.getList(input, req);
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
