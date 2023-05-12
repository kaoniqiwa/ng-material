import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less'],
  providers: [BreadcrumbService],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbs = this._breadcrumbService.breadcrumbs$;
  }
  navigate(url: string) {
    this._router.navigateByUrl(url);
  }
  clickHeadline() {
    this.navigate(
      '/garbage-profiles/underwater/monitor-platform/station-archive'
    );
  }
}
