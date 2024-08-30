import { ApiProperty } from '@nestjs/swagger';
import { FileUploadInput } from './FileUploadInput';

export class ExcelUploadInput extends FileUploadInput {
  @ApiProperty({
    required: false,
    description: 'Excel 文件上传参数',
    default: '',
  })
  public body?: object;
}
