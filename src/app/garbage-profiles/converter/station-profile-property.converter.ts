import { Injectable } from '@angular/core';
import { PartialData } from 'src/app/network/entity/partial-data.entity';
import { StationProfileService } from 'src/app/network/request/station-profile/station-profile.service';

@Injectable()
export class StationProfilePropertyConverter {
  constructor(private _stationProfileService: StationProfileService) {}
  convert(source: PartialData) {
    // this._stationProfileService.get(source.Id);
    let keys = Reflect.ownKeys(source);
    console.log(keys);
  }
}
