import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { Label } from 'src/app/network/entity/label.entity';
import { StationProfileService } from 'src/app/network/request/station-profile/station-profile.service';
import { StationProfileConverter } from './station-profile.converter';
import { StationProfileModel } from './station-profile.model';
import { GetLabelsParams } from 'src/app/network/request/station-profile/station-profile.params';

@Injectable()
export class StationProfileBusiness {
  constructor(
    private _stationProfileService: StationProfileService,
    private _converter: StationProfileConverter
  ) {}

  async init() {
    let data = await this._profileStateStatistic();
    let model: StationProfileModel = this._converter.convert(data);

    let {
      Page: { TotalRecordCount: labelCount },
    } = await this._listLabels();

    model.labelCount = labelCount;
    return model;
  }
  private async _listLabels() {
    let params = new GetLabelsParams();
    params.PageSize = 1;
    return this._stationProfileService.label.list(params);
  }
  private async _profileStateStatistic() {
    return this._stationProfileService.statistic.profileState();
  }
}
