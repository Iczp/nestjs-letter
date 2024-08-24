import { ApiProperty } from '@nestjs/swagger';
import { Rectangle } from 'src/ocrs/dtos/Rectangle';
import { FileUploadDto } from './FileUploadDto';

export class ImageInput extends FileUploadDto {
  @ApiProperty({
    type: () => Rectangle,
    description: 'Rectangle',
    // default: '',
    required: false,
    example: {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    },
  })
  rectangle?: Rectangle;
}
