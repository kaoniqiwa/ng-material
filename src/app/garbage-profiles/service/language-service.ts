import { Injectable } from '@angular/core';
import { StationProfileService } from '../../network/request/station-profile/station-profile.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LanguageService {
  stationProfileProperties: { [key: string]: string } = {};

  constructor(private _stationProfileService: StationProfileService) {
    this._listStationProfileProperties();
  }
  private async _listStationProfileProperties() {
    let res = await this._stationProfileService.property.list();
    res.Data.forEach((property) => {
      this.stationProfileProperties[property.Name] = property.Description;
      if (property.EnumeratedValues && property.EnumeratedValues.length) {
        property.EnumeratedValues.forEach((val) => {
          this.stationProfileProperties[property.Name + '_' + val.Value] =
            val.Name;
        });
      }
    });
  }
}
