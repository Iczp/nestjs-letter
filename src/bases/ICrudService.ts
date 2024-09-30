import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { GetListInput } from './GetListInput';
import { IExcelService } from './IExcelService';
import { IdDto } from 'src/dtos/IdDto';

export interface ICrudService<
  TDto,
  TDetailDto,
  TGetListInput extends GetListInput,
  TCreateInput,
  TUpdateInput,
> extends IExcelService<TGetListInput> {
  getItem(id: string): Promise<TDetailDto>;
  getList(input: TGetListInput): Promise<PagedResultDto<TDto>>;
  create(input: TCreateInput): Promise<TDetailDto>;
  update(id: string, input: TUpdateInput): Promise<TDetailDto>;
  updateEntity(id: string, obj: { [x: string]: any }): Promise<any>;
  delete(id: string | string[]): Promise<IdDto[]>;
}

// export interface IService {
//   getItem(id: string): Promise<any>;
//   getList(input: GetListInput): Promise<PagedResultDto<any>>;
//   create(input: any): Promise<any>;
//   update(id: string, input: any): Promise<any>;
//   delete(id: string): Promise<void>;
// }
