import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  public username: string;

  @ApiProperty()
  public password: string;
}
