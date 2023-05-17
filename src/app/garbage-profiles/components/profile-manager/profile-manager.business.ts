import { Injectable } from '@angular/core';
import { StationProfileService } from 'src/app/network/request/station-profile/station-profile.service';
import { ProfileManagerConverter } from './profile-manager.converter';
import { GetPartialDatasParams } from 'src/app/network/request/station-profile/station-profile.params';
import { Condition } from 'src/app/network/entity/condition.entity';
import { ConditionOperator } from 'src/app/network/enum/condition-operator.enum';
import { UserService } from 'src/app/network/request/user/user.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/network/enum/user-config-type.enum';
import {
  ProfileManagerModel,
  ProfileManagerSearchInfo,
} from './profile-manager.model';
import { PagedList } from 'src/app/network/entity/page.entity';

@Injectable()
export class ProfileManagerBusiness {
  constructor(
    private _stationProfileService: StationProfileService,
    private _userService: UserService,
    private _localStorage: LocalStorageService,
    private _converter: ProfileManagerConverter
  ) {}

  getProfileConfig() {
    return this._userService.config.get(
      this._localStorage.user.Id,
      UserConfigType.GarbageStationProfileProperty
    );
  }
  async listPartialData(searchInfo: ProfileManagerSearchInfo) {
    let params = new GetPartialDatasParams();
    params.PropertyIds = searchInfo.IdsOrNames;

    let condition = new Condition();
    condition.Value = 2;
    condition.PropertyId = 'ProfileState';
    condition.Operator = ConditionOperator.Eq;
    params.Conditions = [condition];

    let { Data, Page } = await this._stationProfileService.partialData.list(
      params
    );
    let data = await this._converter.iterateToModel(Data);

    return {
      Data: data,
      Page,
    } as PagedList<ProfileManagerModel>;
  }
}
