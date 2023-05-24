import { Injectable, Type } from '@angular/core';
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
import { ProfileManagerComponent } from './profile-manager.component';
import { LanguageService } from '../../service/language-service';

@Injectable()
export class ProfileManagerBusiness {
  constructor(
    private _stationProfileService: StationProfileService,
    private _languageService: LanguageService,
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
  /**
   *  Proxy对象不能解构赋值
   * @param searchInfo
   * @returns
   */
  async listPartialData(searchInfo: ProfileManagerSearchInfo) {
    let params = new GetPartialDatasParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;

    let ids: string[] = [];
    searchInfo.IdsOrNames.forEach((key) => {
      if (this._languageService.stationProfileMap.has(key)) {
        ids.push(this._languageService.stationProfileMap.get(key)!.Id);
      }
    });
    params.PropertyIds = ids;

    let conditions = await this._generateCondition(searchInfo, ids);
    params.Conditions = conditions.concat(conditions);

    let { Data, Page } = await this._stationProfileService.partialData.list(
      params
    );
    let data = await this._converter.iterateToModel(Data);

    return {
      Data: data,
      Page,
    } as PagedList<ProfileManagerModel>;
  }

  private async _generateCondition(
    searchInfo: ProfileManagerSearchInfo,
    ids: string[]
  ) {
    const conditions: Condition[] = [];
    if (searchInfo.FuzzyQuery) {
      ids.map((id) => {
        let condition = new Condition<string>();
        condition.Value = searchInfo.FuzzyQuery;
        condition.PropertyId = id;
        condition.Operator = ConditionOperator.Like;
        condition.OrGroup = 1;
        conditions.push(condition);
      });
    }

    return conditions;
  }
}
