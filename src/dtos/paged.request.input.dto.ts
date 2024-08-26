// import {
//   IsNotEmpty,
//   IsBoolean,
//   IsInt,
//   IsDate,
//   IsNumber,
//   IsNumberString,
//   IsOptional,
//   MinLength,
//   MaxLength,
// } from 'class-validator';
// import {
//   PartialType,
//   OmitType,
//   ApiProperty,
//   ApiPropertyOptional,
// } from '@nestjs/swagger';

// import { Transform } from 'class-transformer';

// export class PagedRequestInput {
//   @ApiProperty({
//     type: String,
//     description: '关键字',
//     required: false,
//   })
//   // @IsNotEmpty()
//   // @Type(() => String)
//   @MaxLength(100)
//   @IsOptional()
//   public keyword!: string;

//   @ApiProperty({
//     type: Number,
//     description: '每页显示数量',
//     required: true,
//     default: 10,
//   })
//   // @IsInt()
//   public maxResultCount?: number;

//   @ApiProperty({
//     type: Number,
//     description: 'skin',
//     required: false,
//     default: 0,
//   })
//   // @IsInt()
//   public skin?: number;
// }

// // We want to make the mandatory 'name' type optional during PUT request.
// // So, we'll remove it from the 'CreateActorDto' class and redefine it.
// class _GetListInput extends OmitType(PagedRequestInput, ['keyword']) {
//   keyword?: string;
// }

// export class UpdateDto extends PartialType(_GetListInput) {}
