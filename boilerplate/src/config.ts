import * as index from './template.handlebars';
import * as type from './type.handlebars';
import * as schema from './schema.handlebars';
import * as documents from './documents.handlebars';
import * as selectionSet from './selection-set.handlebars';
import * as fragments from './fragments.handlebars';
import * as enumTemplate from './enum.handlebars';
import { EInputType, GeneratorConfig } from 'graphql-codegen-core';
import { getType } from './helpers/get-type';
import { getOptionals } from './helpers/get-optionals';
import { isPrimitiveType } from './helpers/is-primitive-type';
import { getScalarType } from './helpers/get-scalar-type';
import { shouldHavePrefix } from './helpers/should-have-prefix';
import { getEnumValue } from './helpers/get-enum-value';
import { convertedCreatedType } from './utils/convert-result';

export const config: GeneratorConfig = {
  inputType: EInputType.SINGLE_FILE,
  templates: {
    index,
    type,
    schema,
    documents,
    selectionSet,
    fragments,
    enum: enumTemplate
  },
  flattenTypes: true,
  primitives: {
    String: 'string',
    Int: 'number',
    Float: 'number',
    Boolean: 'boolean',
    ID: 'string'
  },
  customHelpers: {
    convertedType: getType,
    constructType: convertedCreatedType,
    getOptionals,
    isPrimitiveType,
    getScalarType,
    shouldHavePrefix,
    getEnumValue
  },
  // KAMIL: why? Do we have a default now?
  outFile: 'types.ts'
};
