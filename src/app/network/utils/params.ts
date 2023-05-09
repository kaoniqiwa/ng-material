import { HttpParams } from '@angular/common/http';
import { Transform } from 'class-transformer';
import {
  DateTimeFormat,
  transformDateTime,
} from 'src/app/common/utils/transform.util';

export type HttpTypedParams =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

export interface IParams {}

export class PagedParams implements IParams {
  /**页码[1-n](可选) */
  PageIndex: number = 1;
  /**分页大小[1-100](可选) */
  PageSize: number = 9_999;
}
export class DurationParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime(DateTimeFormat))
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime(DateTimeFormat))
  EndTime!: Date;
}
