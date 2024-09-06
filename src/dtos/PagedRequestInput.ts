import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, MaxLength } from 'class-validator';

export class PagedRequestInput {
  @ApiProperty({
    type: String,
    description: '关键字',
    required: false,
  })
  @MaxLength(100)
  @IsOptional()
  public keyword?: string;

  @ApiProperty({
    type: Number,
    description: '每页显示数量',
    required: false,
    // default: 10,
  })
  @IsInt()
  public maxResultCount?: number;

  @ApiProperty({
    type: Number,
    description: 'skin',
    required: false,
    default: null,
  })
  @IsInt()
  public skip?: number;

  @ApiProperty({
    type: String,
    description: '排序',
    required: false,
  })
  public sort?: string;
}
