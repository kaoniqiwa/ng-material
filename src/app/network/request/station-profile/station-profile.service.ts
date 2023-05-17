import { Injectable } from '@angular/core';
import { StationProfilesUrl } from '../../url/garbage-station-profiles/station-profile.url';
import { HttpClient } from '@angular/common/http';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../utils/base-http.service';
import { Label } from '../../entity/label.entity';
import { StationProfile } from '../../entity/station-profile.entity';
import {
  GetLabelsParams,
  GetPartialDatasParams,
  GetProfileStateStatisticsParams,
  GetPropertiesParams,
} from './station-profile.params';
import { ProfileStateStatisticResult } from '../../entity/profile-state-statistic-result.entity';
import { PagedList } from '../../entity/page.entity';
import { Property } from '../../entity/property.entity';
import { PartialData } from '../../entity/partial-data.entity';
import { ParallelHasher } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class StationProfileService {
  private _typeRequest: BaseTypeRequestService<StationProfile>;
  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type<StationProfile>(StationProfile);
  }

  get(id: string) {
    let url = StationProfilesUrl.item(id);

    return this._typeRequest.get(url);
  }

  private _label?: StationProfilesLabelsService;

  get label() {
    if (!this._label) {
      this._label = new StationProfilesLabelsService(this._baseRequest);
    }
    return this._label;
  }

  private _statistic?: StationProfilesStatisticsRequestService;
  get statistic() {
    if (!this._statistic) {
      this._statistic = new StationProfilesStatisticsRequestService(
        this._baseRequest
      );
    }
    return this._statistic;
  }
  private _property?: StationProfilesPropertiesRequestService;
  get property(): StationProfilesPropertiesRequestService {
    if (!this._property) {
      this._property = new StationProfilesPropertiesRequestService(
        this._baseRequest
      );
    }
    return this._property;
  }
  private _partialData?: StationProfilesPartialDataRequestService;
  get partialData(): StationProfilesPartialDataRequestService {
    if (!this._partialData) {
      this._partialData = new StationProfilesPartialDataRequestService(
        this._baseRequest
      );
    }
    return this._partialData;
  }
}

class StationProfilesLabelsService {
  _typeRequest: BaseTypeRequestService<Label>;

  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type(Label);
  }
  create(label: Label) {
    let url = StationProfilesUrl.labels.basic();

    return this._typeRequest.post(url, label);
  }
  get(id: string) {
    let url = StationProfilesUrl.labels.item(id);

    return this._typeRequest.get(url);
  }

  list(params: GetLabelsParams = new GetLabelsParams()) {
    let url = StationProfilesUrl.labels.list();
    return this._typeRequest.paged(url, params);
  }
}

class StationProfilesStatisticsRequestService {
  _typeRequest: BaseTypeRequestService<ProfileStateStatisticResult>;

  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type(ProfileStateStatisticResult);
  }

  profileState(
    params: GetProfileStateStatisticsParams = new GetProfileStateStatisticsParams()
  ) {
    let url = StationProfilesUrl.statistic.profileState();

    return this._typeRequest.post(url, params);
  }
}

class StationProfilesPropertiesRequestService {
  _typeRequest: BaseTypeRequestService<Property>;
  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type(Property);
  }

  list(params: GetPropertiesParams = new GetPropertiesParams()) {
    let url = StationProfilesUrl.property.list();
    return this._typeRequest.paged(url, params);
  }
}

class StationProfilesPartialDataRequestService {
  _typeRequest: BaseTypeRequestService<PartialData>;
  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type(PartialData);
  }
  list(params: GetPartialDatasParams = new GetPartialDatasParams()) {
    let url = StationProfilesUrl.partialData.list();

    return this._typeRequest.paged(url, params);
  }
}
