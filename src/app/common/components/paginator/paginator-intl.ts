import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel: string = '每页:';

  override nextPageLabel: string = '下一页';

  override previousPageLabel: string = '上一页';

  override firstPageLabel: string = '第一页';

  override lastPageLabel: string = '最后一页';

  constructor() {
    super();
  }
}
