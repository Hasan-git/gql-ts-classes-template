import { pascalCase } from 'change-case';
import { Field } from 'graphql-codegen-core';

export function getFieldType(field: Field, realType: string, options: Handlebars.HelperOptions) {
  const config = options.data.root.config || {};
  const useImmutable = !!config.immutableTypes;

  if (!field.isScalar && !field.isArray) {
  return  `${'new '+ realType+'Base()'}`;
  }

  if (field.isArray) {
    let result = realType;

    const dimension = field.dimensionOfArray + 1;
    
    // OVERRIDE
    if (field.isNullableArray && !config.noNamespaces) {
      result = useImmutable ? [realType, 'null'].join('|') : `(${['null'].join('')})`;
    }

    result = `${result}${new Array(dimension).join('[]')}`;

   

    if (!field.isRequired) {

      result = ['[]'].join('');
    }

    

    return result;
  } else {
    if (field.isRequired) {
      // todo : if required should remove  = null
      return 'null';
    } else {
      return [ 'null'].join('');
      // return [realType, 'null'].join(' | ');
    }
  }
}

export function convertedCreatedType(type: Field, options: Handlebars.HelperOptions, skipPascalCase = false) {
  const baseType = type.type;
  const underscorePrefix = type.type.match(/^[\_]+/) || '';
  const config = options.data.root.config || {};
  const realType =
    options.data.root.primitives[baseType] ||
    `${type.isScalar ? '' : config.interfacePrefix || ''}${underscorePrefix +
      (skipPascalCase ? baseType : pascalCase(baseType))}`;

  return getFieldType(type, realType, options);
}
