import { Exclude } from 'class-transformer';
import { Property } from './property.entity';

export class ExtendedProperty extends Property {
  @Exclude({ toClassOnly: true })
  get isEnum() {
    return !!this.EnumeratedValues?.length;
  }
}
