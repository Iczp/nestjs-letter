import { BaseController } from './BaseController';
import {
  BadRequestException,
  Body,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Workbook } from 'exceljs';
import { ExcelUploadInput } from 'src/dtos/ExcelUploadInput';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { Response } from 'express';
import { IExcelService } from './IExcelService';
import { ExcelWorkbook } from 'src/dtos/ExcelWorkbook';
export abstract class ExcelController extends BaseController {
  // public readonly excelService: IExcelService;
  constructor(readonly service: IExcelService) {
    super();
    // this.excelService = excelService;
  }

  private async resExcelFile({
    res,
    fn,
  }: {
    res: Response;
    fn: () => Promise<ExcelWorkbook>;
  }) {
    const { filename, workbook } = await fn();
    const headers = {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}";`,
    };
    Object.entries(headers).forEach((item) => {
      res.setHeader(item[0], item[1]);
    });
    await workbook.xlsx.write(res);
    res.end();
  }

  @Get('excel/tpl')
  @ApiOperation({ summary: 'excel 模板', description: `excel 模板` })
  public async getExcelTemplate(@Res() res: Response) {
    this.resExcelFile({
      res,
      fn: this.service.generateExampleExcel,
    });
  }

  @Get('excel/export')
  @ApiOperation({ summary: 'excel 模板', description: `excel 模板` })
  public async exportExcel(@Res() res: Response) {
    this.resExcelFile({
      res,
      fn: this.service.generateExcel,
    });
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
    @Query() query: any,
    @Body() body: any,
  ): Promise<ExcelImportResult> {
    const workbook = new Workbook();
    await workbook.xlsx.load(file.buffer);
    return await this.service.importExcel(workbook, { query, body });
  }
}
