import { BasicUrl } from '../../basic.url';

export class StationProfilesUrl {
  /** /api/howell/ver10/aiop_service/garbage_profiles/GarbageStationProfiles */
  static get basic(): string {
    return `${BasicUrl.garbage_profiles}/GarbageStationProfiles`;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }

  static list() {
    return `${this.basic}/List`;
  }

  private static _labels: StationProfileLabelsUrl;
  static get labels() {
    if (!this._labels) {
      this._labels = new StationProfileLabelsUrl(this.basic);
    }
    return this._labels;
  }

  private static _statistic: StationProfilesStatisticsUrl;
  static get statistic() {
    if (!this._statistic) {
      this._statistic = new StationProfilesStatisticsUrl(this.basic);
    }
    return this._statistic;
  }

  private static _property: StationProfilesPropertiesUrl;
  static get property() {
    if (!this._property) {
      this._property = new StationProfilesPropertiesUrl(this.basic);
    }
    return this._property;
  }
}

class StationProfileLabelsUrl {
  private _base = '';
  constructor(base: string) {
    this._base = base + '/labels';
  }
  basic() {
    return this._base;
  }
  item<T = string>(id: T) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}

class StationProfilesStatisticsUrl {
  private _base = '';

  constructor(base: string) {
    this._base = base + '/Statistics';
  }

  basic() {
    return this._base;
  }

  profileState() {
    return `${this.basic()}/ProfileState`;
  }
}

class StationProfilesPropertiesUrl {
  private _base = '';

  constructor(base: string) {
    this._base = base + '/Properties';
  }
  basic() {
    return this._base;
  }
  item<T = string>(id: T) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}
