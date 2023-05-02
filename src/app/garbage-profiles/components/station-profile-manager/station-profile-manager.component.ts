import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthorizationRequestService } from 'src/app/network/request/authorization/authorization-request.service';
@Component({
  selector: 'station-profile-manager',
  templateUrl: './station-profile-manager.component.html',
  styleUrls: ['./station-profile-manager.component.less'],
})
export class StationProfileManagerComponent implements OnInit {
  constructor(
    private s: AuthorizationRequestService,
    private http: HttpClient
  ) {}

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
    this.http
      .post(
        '/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List',
        {
          PageIndex: 1,
          PageSize: 1,
        },
        {
          headers: this.s.generateHttpHeader(
            'POST',
            '/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List'
          ),
        }
      )
      .subscribe(console.log);
  }
}

//http://localhost:9000/api/howell/ver10/garbage_profiles/GarbageStationProfiles/Labels/List
