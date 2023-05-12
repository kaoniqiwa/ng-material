import { ProfileStateStatisticResult } from 'src/app/network/entity/profile-state-statistic-result.entity';
import { StationProfileModel } from './station-profile.model';

export class StationProfileConverter {
  convert(source: ProfileStateStatisticResult) {
    return this._covertFromProfileStateStatisticResult(source);
  }

  private _covertFromProfileStateStatisticResult(
    source: ProfileStateStatisticResult
  ) {
    let model = new StationProfileModel();
    model.profiles = source.Items;
    model.profileCount = source.Items.reduce(
      (prev, cur) => prev + cur.Number,
      0
    );
    model.labelCount = 0;

    return model;
  }
}
