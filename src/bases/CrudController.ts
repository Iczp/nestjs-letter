import { BaseController } from './BaseController';
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { IService } from './ICrudService';
import { FileInterceptor } from '@nestjs/platform-express';
import { Workbook } from 'exceljs';
import { ExcelUploadInput } from 'src/dtos/ExcelUploadInput';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { Response } from 'express';
export abstract class CrudController<
  TDto,
  TDetailDto,
  TGetListInput extends object,
  TCreateInput,
  TUpdateInput,
> extends BaseController {
  // implements ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  // public readonly service: IService;
  constructor(readonly service: IService) {
    super();
    this.service = service;
  }

  @Get('')
  @ApiOperation({ summary: '获取列表', description: '获取列表' })
  async getList(@Query() input: TGetListInput): Promise<PagedResultDto<TDto>> {
    console.log(input);
    return this.service.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个', description: '获取单个' })
  public async getItem(@Param('id') id: string): Promise<TDetailDto> {
    return this.service.getItem(id);
  }

  @Post('')
  @ApiOperation({ summary: '新增', description: `` })
  public async create(@Body() input: TCreateInput): Promise<TDetailDto> {
    console.log(input);
    return this.service.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改', description: `` })
  public async update(
    @Param('id') id: string,
    @Body() input: TUpdateInput,
  ): Promise<TDetailDto> {
    console.log(id, input);
    return this.service.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: `` })
  public async delete(@Query('id') id: string) {
    console.log(id);
    await this.service.delete(id);
  }

  @Get('excel/tpl')
  @ApiOperation({ summary: 'excel 模板', description: `excel 模板` })
  public async getExcelTemplate(@Res() res: Response) {
    // console.log(id);
    // await this.service.getExcelTemplate(id);
    const workbook = new Workbook();

    const { filename } = await this.service.generateExcelBook(workbook);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const encodedFilename = encodeURIComponent(filename).replace(
      /['%]/g,
      function (match) {
        // 处理特殊字符，但在这个例子中，我们其实不需要替换 %
        // 因为 encodeURIComponent 已经处理了它
        return match === "'" ? '%27' : match; // 注意：通常不需要替换 %
      },
    );
    console.log('filename:', filename, encodedFilename);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}";`);
    await workbook.xlsx.write(res);
    res.end();
  }

  @Post('excel/import')
  @ApiOperation({ summary: '导入数据', description: `文件类型 xlsx | xls` })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(xlsx|xls)$/)) {
          return cb(
            new BadRequestException('Only Excel files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Excel',
    type: ExcelUploadInput,
  })
  public async importExcel(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ExcelImportResult> {
    const workbook = new Workbook();
    await workbook.xlsx.load(file.buffer);
    return await this.service.importExcel(workbook);
  }
}
