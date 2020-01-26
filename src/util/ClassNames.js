/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function isString(classValue) {
  return typeof classValue === "string";
}

function isNonEmptyArray(classValue) {
  return Array.isArray(classValue) && classValue.length > 0;
}

function isClassDictionary(classValue) {
  return typeof classValue === "object";
}

export function classNames(...classValues) {
  const classes = [];

  for (let i = 0; i < classValues.length; i++) {
    const classValue = classValues[i];
    if (!classValue) continue;

    if (isString(classValue)) {
      classes.push(classValue);
    } else if (isNonEmptyArray(classValue)) {
      const inner = classNames.apply(null, classValue);
      if (inner) {
        classes.push(inner);
      }
    } else if (isClassDictionary(classValue)) {
      for (let key in classValue) {
        if (classValue.hasOwnProperty(key) && classValue[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}
