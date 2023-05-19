import { PromiseConverter } from 'src/app/common/utils/converter.utils';
import { PartialData } from 'src/app/network/entity/partial-data.entity';
import { ProfileManagerModel } from './profile-manager.model';
import { StationProfilePropertyConverter } from '../../converter/station-profile-property.converter';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileManagerConverter extends PromiseConverter<ProfileManagerModel> {
  constructor(
    private _stationProfilePropertyConverter: StationProfilePropertyConverter
  ) {
    super();
  }
  async convert(source: PartialData) {
    return await this._fromPartialData(source);
  }
  private async _fromPartialData(source: PartialData) {
    let model = new ProfileManagerModel();

    console.log(source);
    let partialData = await this._stationProfilePropertyConverter.convert(
      source
    );
    Object.assign(model, partialData);

    return model;
  }
}
