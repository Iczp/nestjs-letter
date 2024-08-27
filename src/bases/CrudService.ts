/* eslint-disable @typescript-eslint/no-unused-vars */
import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { ICrudService } from './ICrudService';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import e, { createClient } from 'dbschema/edgeql-js'; // auto-generated code
import { ObjectTypeExpression } from 'dbschema/edgeql-js/typesystem';

const client = createClient();

export abstract class CrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  implements ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
{
  public abstract entityName: string;
  public abstract entity: ObjectTypeExpression;

  protected itemQuery(): object {
    return this.entity['*'];
  }

  mapToDto(item: any): TDetailDto {
    return item as TDetailDto;
  }

  public async getItem(id: string): Promise<TDetailDto> {
    const prams = this.itemQuery() as object;
    const query = e.select(this.entity, (entity) => ({
      ...prams,
      // ...e.User['*'],
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
    }));
    const result = await query.run(client);
    return this.mapToDto(result[0]);
  }

  public getList(input: PagedRequestInput): Promise<PagedResultDto<TDto>> {
    throw new Error('Method not implemented.');
  }
  public create(input: TCteateInput): Promise<TDetailDto> {
    throw new Error('Method not implemented.');
  }
  public update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
