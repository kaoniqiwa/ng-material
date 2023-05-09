import { Injectable, Type } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { PagedList } from '../entity/page.entity';

@Injectable({
  providedIn: 'root',
})
export class ConvertResponseService {
  convert<T>(response: T | T[] | PagedList<T>, typed: Type<any>) {
    if ((response as PagedList<T>).Page) {
      response = plainToInstance(PagedList<T>, response);
      response.Data = plainToInstance(typed, response.Data);

      return response;
    }
    return plainToInstance(typed, response) as T;
  }
}
