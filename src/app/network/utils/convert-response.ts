import { Injectable, Type } from '@angular/core';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class ConvertResponseService {
  convert<T>(response: T, typed: Type<any>) {
    return plainToInstance(typed, response) as T;
  }
}
