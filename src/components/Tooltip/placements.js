/*
MIT LICENSE

Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { placements } from "rc-tooltip/lib/placements";

const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
};

const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
};

const targetOffset = [0, 0];

export function getOverflowOptions(autoAdjustOverflow) {
  if (typeof autoAdjustOverflow === "boolean") {
    return autoAdjustOverflow
      ? autoAdjustOverflowEnabled
      : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow
  };
}

export default function getPlacements(config = {}) {
  const {
    arrowWidth = 5,
    horizontalArrowShift = 16,
    verticalArrowShift = 12,
    autoAdjustOverflow = true
  } = config;
  const placementMap = {
    left: {
      points: ["cr", "cl"],
      offset: [-4, 0]
    },
    right: {
      points: ["cl", "cr"],
      offset: [4, 0]
    },
    top: {
      points: ["bc", "tc"],
      offset: [0, -4]
    },
    bottom: {
      points: ["tc", "bc"],
      offset: [0, 4]
    },
    topLeft: {
      points: ["bl", "tc"],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ["tr", "cl"],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ["br", "tc"],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ["tl", "cr"],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ["tr", "bc"],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ["bl", "cr"],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ["tl", "bc"],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ["br", "cl"],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach(key => {
    placementMap[key] = config.arrowPointAtCenter
      ? {
          ...placementMap[key],
          overflow: getOverflowOptions(autoAdjustOverflow),
          targetOffset
        }
      : {
          ...placements[key],
          overflow: getOverflowOptions(autoAdjustOverflow)
        };

    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
