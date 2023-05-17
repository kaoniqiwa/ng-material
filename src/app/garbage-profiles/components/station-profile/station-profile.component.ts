import { Component, OnInit } from '@angular/core';
import { StationProfileBusiness } from './station-profile.business';
import { StationProfileConverter } from './station-profile.converter';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';
import { LanguageService } from 'src/app/garbage-profiles/service/language-service';
import { StationProfileModel } from './station-profile.model';
import { filter } from 'rxjs';
import { ValidPathExp } from 'src/app/common/utils/tool.util';
import { RoutePath } from 'src/app/app-routing.path';
@Component({
  selector: 'station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.less'],
  providers: [StationProfileBusiness, StationProfileConverter],
})
export class StationProfileComponent implements OnInit {
  model: StationProfileModel = new StationProfileModel();
  show = true;

  constructor(
    private _router: Router,
    private _business: StationProfileBusiness,
    public language: LanguageService
  ) {
    this._router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        let mode = e.urlAfterRedirects.match(ValidPathExp);
        if (
          mode &&
          mode.groups &&
          mode.groups['third'] == RoutePath.station_profile &&
          !mode.groups['forth']
        ) {
          // console.log('show');
          this.show = true;
        } else {
          // console.log('hide');
          this.show = false;
        }
      });
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.model = await this._business.init();
  }
}
