import { formatDate } from "@angular/common";
import { TransformFnParams, TransformationType } from "class-transformer";

export function transformDate({ value, type }: TransformFnParams, format: string) {
  if (type == TransformationType.PLAIN_TO_CLASS) {
    return new Date(value)
  } else if (type == TransformationType.CLASS_TO_PLAIN) {
    return formatDate(value, format, 'en')
  } else if (type == TransformationType.CLASS_TO_CLASS) {
    return value
  }
}