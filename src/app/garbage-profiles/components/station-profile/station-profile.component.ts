import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthorizationRequestService } from 'src/app/common/service/authorization-request.service';
import { StationProfileBusiness } from './station-profile.business';
@Component({
  selector: 'station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.less'],
  providers: [StationProfileBusiness],
})
export class StationProfileComponent implements OnInit {
  constructor(private _business: StationProfileBusiness) {}

  ngOnInit(): void {
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
