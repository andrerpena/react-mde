/*
The MIT License (MIT)

Copyright (c) 2018 Magnus Sjöstrand
Copyright (c) 2016 Johannes Stein

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { statSync } from "fs";
import path from "path";

export const localResolver = (options = { extensions: [".js"] }) => ({
  resolveId(importee, importer) {
    if (importee.indexOf("./") === -1) {
      return null;
    }

    if (!importer) {
      return null;
    }

    const { dir } = path.parse(importer);

    return options.extensions
      .reduce(
        (agg, ext) =>
          agg.concat([
            path.resolve(dir, `${importee}${ext}`),
            path.resolve(dir, importee, `index${ext}`)
          ]),
        []
      )
      .sort()
      .find(possibleImporteePath => {
        try {
          return statSync(possibleImporteePath).isFile();
        } catch (e) {
          return false;
        }
      });
  }
});
