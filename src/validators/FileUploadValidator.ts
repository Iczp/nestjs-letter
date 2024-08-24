import {
  Injectable,
  PipeTransform,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileUploadValidator implements PipeTransform {
  constructor(
    private readonly maxSize: number = 1000 * 1024, // 默认最大文件大小为 1MB
    private readonly allowedMimeTypes: string[] = ['image/jpeg', 'image/png'],
  ) {}

  async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    if (file.size > this.maxSize) {
      throw new HttpException(
        `File size cannot exceed ${this.maxSize / 1024}KB`,
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Unsupported file type. Allowed types are: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    return file;
  }
}
