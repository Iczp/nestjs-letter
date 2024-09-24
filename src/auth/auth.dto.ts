import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
  @ApiProperty()
  sub: string;
}

export class LoginUser {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public account: string;

  @ApiProperty()
  public name: string;
}

export class AuthInput {
  @ApiProperty()
  public account: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public validate_code: string;
}

export class TokenResult {
  /**
   *
   *
   * @type {(string )}
   * @memberof TokenResult
   */
  @ApiProperty()
  public access_token: string;

  /**
   *
   *
   * @type {(string )}
   * @memberof TokenResult
   */
  @ApiProperty()
  public token_type: string;

  /**
   * 过期时间，单位：秒
   *
   * @type {(number )}
   * @memberof TokenResult
   */
  @ApiProperty()
  public expires_in: number;

  /**
   *
   *
   * @type {(string )}
   * @memberof TokenResult
   */
  @ApiProperty()
  public refresh_token?: string;

  /**
   *
   *
   * @type {(string )}
   * @memberof TokenResult
   */
  @ApiProperty({ description: '创建时间' })
  public creation_time?: Date;
}
