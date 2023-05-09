import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { Label } from 'src/app/network/entity/label.entity';
import { StationProfileService } from 'src/app/network/request/station-profile/station-profile.service';

@Injectable()
export class StationProfileBusiness {
  constructor(private _stationProfileService: StationProfileService) {}
  async getLabel() {
    let data = await this._stationProfileService.statistic.profileState();
    // res.Items
  }
  async profileStateStatistic() {
    let res = await this._stationProfileService.statistic.profileState();
    console.log(res);
  }
}
