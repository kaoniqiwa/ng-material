import { CommonConverter } from 'src/app/common/utils/converter.utils';
import { PartialData } from 'src/app/network/entity/partial-data.entity';
import { ProfileManagerModel } from './profile-manager.model';
import { StationProfilePropertyConverter } from '../../converter/station-profile-property.converter';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileManagerConverter extends CommonConverter<ProfileManagerModel> {
  constructor(
    private _stationProfilePropertyConverter: StationProfilePropertyConverter
  ) {
    super();
  }
  convert(source: PartialData) {
    return this._fromPartialData(source);
  }
  private _fromPartialData(source: PartialData) {
    let model = new ProfileManagerModel();
    Object.assign(model, source);

    this._stationProfilePropertyConverter.convert(source);
    return model;
  }
}
