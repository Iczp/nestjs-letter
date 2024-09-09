import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';

import { CrudController } from 'src/bases/CrudController';

import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { Auditing } from 'src/audits/audits.decorator';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityUpdateInput,
} from './activities.dto';

@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController extends CrudController<
  ActivityDto,
  ActivityDetailDto,
  ActivityGetListInput,
  ActivityCreateInput,
  ActivityUpdateInput
> {
  constructor(private readonly userService: ActivitiesService) {
    super(userService);
  }
  @Get()
  @ApiOperation({ summary: '活动列表' })
  @Auditing(false)
  public override getList(
    input: ActivityGetListInput,
  ): Promise<PagedResultDto<ActivityDto>> {
    return super.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '活动详情' })
  public override getItem(@Param('id') id: string): Promise<ActivityDetailDto> {
    return super.getItem(id);
  }

  @Post()
  @ApiOperation({ summary: '创建活动' })
  public override create(
    @Body() input: ActivityCreateInput,
  ): Promise<ActivityDetailDto> {
    return super.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改活动' })
  public override update(
    @Param('id') id: string,
    input: ActivityUpdateInput,
  ): Promise<ActivityDetailDto> {
    return super.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除活动' })
  public override delete(id: string): Promise<void> {
    return super.delete(id);
  }
}
