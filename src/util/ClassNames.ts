/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

export function classNames(...args: any[]) {
  const classes = [];

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === "object") {
      for (let key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}