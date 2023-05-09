import { Injectable, forwardRef } from '@angular/core';
import { StationProfileService } from '../../network/request/station-profile/station-profile.service';
import { Property } from 'src/app/network/entity/property.entity';

export class LanguageService {
  stationProfileProperties: { [key: string]: string } = {};

  constructor(private _stationProfileService: StationProfileService) {
    this._listStationProfileProperties();
  }
  private async _listStationProfileProperties() {
    let res = await this._stationProfileService.property.list();
    res.Data.forEach((property) => {
      if (property.EnumeratedValues && property.EnumeratedValues.length) {
        property.EnumeratedValues.forEach((val) => {
          this.stationProfileProperties[property.Name + '_' + val.Value] =
            val.Name;
        });
      } else {
        this.stationProfileProperties[property.Name] = property.Description;
      }
    });
    console.log(this.stationProfileProperties);
  }
}
