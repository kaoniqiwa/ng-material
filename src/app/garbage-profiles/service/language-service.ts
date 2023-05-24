import { Injectable } from '@angular/core';
import { StationProfileService } from '../../network/request/station-profile/station-profile.service';
import { BehaviorSubject } from 'rxjs';
import { ValueNamePair } from 'src/app/network/entity/value-name-pair.entity';
import { Property } from 'src/app/network/entity/property.entity';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  stationProfileMap = new Map<string, Property>();
  stationProfileDescription: { [key: string]: any } = {};
  stationProfileEnums: { [key: string]: ValueNamePair[] } = {};

  constructor(private _stationProfileService: StationProfileService) {}
  async listStationProfileProperties() {
    let res = await this._stationProfileService.property.list();
    console.log(res);
    res.Data.forEach((property) => {
      this.stationProfileDescription[property.Name] = property.Description;
      this.stationProfileMap.set(property.Name, property);

      if (property.EnumeratedValues && property.EnumeratedValues.length) {
        property.EnumeratedValues.forEach((val) => {
          this.stationProfileDescription[property.Name + '_' + val.Value] =
            val.Name;
        });
        this.stationProfileEnums[property.Name] = property.EnumeratedValues;
      }
    });
  }
}
