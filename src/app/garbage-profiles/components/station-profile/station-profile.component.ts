import { Component, OnInit } from '@angular/core';
import { StationProfileBusiness } from './station-profile.business';
import { StationProfileConverter } from './station-profile.converter';
import {
  ActivatedRoute,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';
import { LanguageService } from 'src/app/common/service/language-service';
import { StationProfileModel } from './station-profile.model';
@Component({
  selector: 'station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.less'],
  providers: [StationProfileBusiness, StationProfileConverter],
})
export class StationProfileComponent implements OnInit {
  model: StationProfileModel = new StationProfileModel();
  constructor(
    private _business: StationProfileBusiness,
    public language: LanguageService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.model = await this._business.init();
  }
}

//http://localhost:9000/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List
