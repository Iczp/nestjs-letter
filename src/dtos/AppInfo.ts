import { ApiProperty } from '@nestjs/swagger';
import {
  version,
  name,
  author,
  email,
  website,
  description,
} from '../../package.json';
export class AppInfo {
  @ApiProperty({
    default: name,
  })
  name: string;

  @ApiProperty({
    default: version,
  })
  version?: string;

  @ApiProperty({
    default: description,
  })
  description?: string;

  @ApiProperty({
    default: author,
  })
  author?: string;

  @ApiProperty({
    default: email,
  })
  email?: string;

  @ApiProperty({
    default: website,
  })
  website?: string;
}
