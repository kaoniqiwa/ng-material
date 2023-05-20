import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  instanceToInstance,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { forkJoin } from 'rxjs';
import { ExtendedProperty } from 'src/app/network/entity/extended-property.entity';
import { PartialData } from 'src/app/network/entity/partial-data.entity';
import { Property } from 'src/app/network/entity/property.entity';
import { ValueNamePair } from 'src/app/network/entity/value-name-pair.entity';
import { PropertyDataType } from 'src/app/network/enum/property-data-type.enum';
import { StationProfileService } from 'src/app/network/request/station-profile/station-profile.service';

@Injectable()
export class StationProfilePropertyConverter {
  private _propertyMap = new Map<string, ExtendedProperty>();

  constructor(private _stationProfileService: StationProfileService) {}
  convert(source: any) {
    if (source instanceof PartialData) {
      return this._fromPartialData(source);
    }
    throw new TypeError();
  }

  private async _fromPartialData(item: PartialData) {
    let partialData = Object.assign({}, item);
    let keys = Object.keys(partialData);
    await this._listProperty(item);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let property = this._propertyMap.get(key)!;
      if (property.IsArray) {
      } else if (property.isEnum) {
        partialData[key] = this._fromEnum(
          partialData[key],
          property.EnumeratedValues!
        );
      } else {
        switch (property.DataType) {
          case PropertyDataType.DateTime:
            partialData[key] = this._fromDateTime(partialData[key]);
        }
      }
    }

    return partialData;
  }
  private async _listProperty(item: PartialData) {
    let keys = Object.keys(item);

    let arr: Promise<Property>[] = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      if (!this._propertyMap.has(key)) {
        arr.push(this._stationProfileService.property.get(keys[i]));
      }
    }
    let res = await Promise.all(arr);
    res.forEach((property) => {
      let extendedProperty = plainToInstance<ExtendedProperty, any>(
        ExtendedProperty,
        instanceToPlain(property)
      );
      this._propertyMap.set(extendedProperty.Name, extendedProperty);
    });
  }
  private _fromEnum(value: number, enums: ValueNamePair[]) {
    if (value) {
      let result = value.toString();
      let keyvalue = enums.find((x) => x.Value === value);
      if (keyvalue) {
        result = keyvalue.Name;
      }
      return result;
    }
    return '无';
  }
  private _fromDateTime(value: string) {
    return formatDate(value, 'YYYY-MM-dd HH:mm:ss', 'en');
  }
}
