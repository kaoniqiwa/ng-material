import { ProfileStateStatisticResult } from 'src/app/network/entity/profile-state-statistic-result.entity';
import { StationProfileModel } from './station-profile.model';

export class StationProfileConverter {
  convert() {}

  private _covertFromStationProfileConverter(
    source: ProfileStateStatisticResult
  ) {
    let model = new StationProfileModel();
    // model.profileCount;
    // source.Items
  }
}
