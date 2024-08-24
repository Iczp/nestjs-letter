import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({
    description: 'fieldname+1',
  })
  fieldname: string;

  /** Name of the file on the uploader's computer. */
  @ApiProperty()
  originalname: string;
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  @ApiProperty()
  encoding: string;

  /** Value of the `Content-Type` header for this file. */
  @ApiProperty()
  mimetype: string;

  /** Size of the file in bytes. */
  @ApiProperty()
  size: number;

  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  @ApiProperty()
  destination: string;

  /** `DiskStorage` only: Name of this file within `destination`. */
  @ApiProperty()
  filename: string;

  /** `DiskStorage` only: Full path to the uploaded file. */
  @ApiProperty()
  path: string;
}
