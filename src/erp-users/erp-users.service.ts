import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BaseService } from 'src/bases/BaseService';
import { ErpUsersGetListInput } from './erp-users.dto';
import { ConfigService } from '@nestjs/config';
import { AXIOS_TIMEOUT, ERP_API_BASE_URL } from 'src/configures/env';

@Injectable()
export class ErpUsersService extends BaseService {
  private baseURL: string;
  private timeout: number;

  constructor(private configService: ConfigService) {
    super();
    this.baseURL = configService.get<string>(ERP_API_BASE_URL);
    this.timeout = configService.get<number>(AXIOS_TIMEOUT) || 30 * 1000;
  }

  async findAll(input: ErpUsersGetListInput): Promise<any> {
    const { data } = await axios.request({
      baseURL: this.baseURL,
      url: `/api/rcteabasic/erp-user`,
      method: 'get',
      params: input,
    });
    console.log(data);
    return data;
  }

  async findOne(id: string): Promise<any> {
    const { data } = await axios.request({
      baseURL: this.baseURL,
      url: `/api/rcteabasic/erp-user/${id}`,
      method: 'get',
    });
    console.log(data);
    return data;
  }
}
