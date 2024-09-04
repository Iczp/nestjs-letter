import { ApiProperty } from '@nestjs/swagger';

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
}
