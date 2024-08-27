import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

export interface ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  extends IService {
  getItem(id: string): Promise<TDetailDto>;
  getList(input: PagedRequestInput): Promise<PagedResultDto<TDto>>;
  create(input: TCteateInput): Promise<TDetailDto>;
  update(id: string, input: TUpdateInput): Promise<TDetailDto>;
  delete(id: string): Promise<void>;
}

export interface IService {
  getItem(id: string): Promise<any>;
  getList(input: PagedRequestInput): Promise<PagedResultDto<any>>;
  create(input: any): Promise<any>;
  update(id: string, input: any): Promise<any>;
  delete(id: string): Promise<void>;
}
