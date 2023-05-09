import { Component, OnInit } from '@angular/core';
import { StationProfileBusiness } from './station-profile.business';
import { StationProfileConverter } from './station-profile.converter';
import { LanguageService } from 'src/app/common/service/language-service';
@Component({
  selector: 'station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.less'],
  providers: [StationProfileBusiness, StationProfileConverter],
})
export class StationProfileComponent implements OnInit {
  constructor(
    private _business: StationProfileBusiness,
    private _languageService: LanguageService
  ) {}

  ngOnInit(): void {
    console.log(this._languageService.stationProfileProperties);

    this._business.getLabel();
    // axios
    //   .post(
    //     '/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List',
    //     {
    //       PageIndex: 1,
    //       PageSize: 1,
    //     },
    //     {
    //       headers: this.s.generateHttpHeader(
    //         'post',
    //         '/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List'
    //       ),
    //     }
    //   )
    //   .then((res) => console.log(res));
    // this.http
    //   .post(
    //     '/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List',
    //     {
    //       PageIndex: 1,
    //       PageSize: 1,
    //     }
    //   )
    //   .subscribe(console.log);
  }
}

//http://localhost:9000/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List
