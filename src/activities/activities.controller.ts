import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CrudController } from 'src/bases/CrudController';
// import { Auditing } from 'src/audits/audits.decorator';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityPagedResult,
  ActivityTemplageInput as ActivityTemplateInput,
  ActivityUpdateInput,
} from './activities.dto';
import { AcitvitiesPermissions } from 'src/app.permissions';
import { CurrentUserApiTags } from 'src/app.consts';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectResult } from 'src/types/ObjectResult';

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

  protected Policy_Set_Template = AcitvitiesPermissions.Activity_Set_Template;

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

  @Post('/set-temp/:id')
  @ApiOperation({
    summary: '设置活动模板',
    description: `设置模板`,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
          return cb(
            new BadRequestException(`Only 'png|jpg|jpeg' files are allowed!`),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '模板图片',
    type: ActivityTemplateInput,
  })
  public async setTemplate(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: ActivityTemplateInput,
    @Req() req: any,
  ): Promise<ObjectResult> {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Set_Template);
    const base64 = file.buffer.toString('base64');

    console.log('typeof body', typeof body);
    console.log(body, id);
    const mimetype = file.mimetype;

    body = typeof body === 'string' ? JSON.parse(body) : body;
    // return this.activitiesService.setTemplate(id, base64);
    // return true;
    return await this.activitiesService.setTemplate(id, mimetype, base64, body);
  }
}
