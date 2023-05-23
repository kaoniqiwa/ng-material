import { Injectable } from '@angular/core';
import { StationProfileService } from '../../network/request/station-profile/station-profile.service';
import { BehaviorSubject } from 'rxjs';
import { ValueNamePair } from 'src/app/network/entity/value-name-pair.entity';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  stationProfileProperties: { [key: string]: string } = {};
  stationProfileEnums: { [key: string]: ValueNamePair[] } = {};

  constructor(private _stationProfileService: StationProfileService) {}
  async listStationProfileProperties() {
    let res = await this._stationProfileService.property.list();
    res.Data.forEach((property) => {
      this.stationProfileProperties[property.Name] = property.Description;

      if (property.EnumeratedValues && property.EnumeratedValues.length) {
        property.EnumeratedValues.forEach((val) => {
          this.stationProfileProperties[property.Name + '_' + val.Value] =
            val.Name;
        });
        this.stationProfileEnums[property.Name] = property.EnumeratedValues;
      }
    });
  }
}
