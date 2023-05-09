import { Injectable } from '@angular/core';
import { StationProfileService } from '../request/station-profile/station-profile.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private _stationProfileService: StationProfileService) {
    this._stationProfileService.property
      .list()
      .then((res) => console.log('sss', res));
  }
}
