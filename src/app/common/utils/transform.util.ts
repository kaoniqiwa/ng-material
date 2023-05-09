import { formatDate } from '@angular/common';
import { TransformFnParams, TransformationType } from 'class-transformer';

export function transformDateTime(format: string) {
  return function ({ value, type }: TransformFnParams) {
    if (type == TransformationType.PLAIN_TO_CLASS) {
      return new Date(value);
    } else if (type == TransformationType.CLASS_TO_PLAIN) {
      return formatDate(value, format, 'zh');
    } else if (type == TransformationType.CLASS_TO_CLASS) {
      return value;
    }
  };
}

export const DateTimeFormat = 'yyyy-MM-ddTHH:mm:ssZZZZZ';
export const DateFormat = 'yyyy-MM-dd';
export const TimeFormat = 'HH:mm:ss';
