import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  public account: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public validate_code: string;
}
