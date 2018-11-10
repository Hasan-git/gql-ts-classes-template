import { SafeString } from 'handlebars';
import { Field } from 'graphql-codegen-core';
import { convertedCreatedType } from '../utils/convert-result';

export function createType(type: Field, options: Handlebars.HelperOptions) {
  if (!type) {
    return '';
  }

  const result = convertedCreatedType(type, options);

  return new SafeString(result);
}
