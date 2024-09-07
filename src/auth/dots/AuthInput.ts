import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public password: string;
}
