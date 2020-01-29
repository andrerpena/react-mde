const { readdirSync, statSync } = require("fs");
const { resolve } = require("path");

const readDirectory = path =>
  readdirSync(path).reduce((acc, folder) => {
    const dirPath = `${path}${folder}`;
    if (statSync(resolve(dirPath)).isDirectory()) {
      acc[`~${folder.replace(/[^\w\s]/gi, "")}`] = dirPath;
    }

    return acc;
  }, {});

const alias = {
  ...readDirectory("./src/")
};

module.exports = function(api) {
  api.cache(true);

  return {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-export-default-from",
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        "module-resolver",
        {
          alias
        }
      ]
    ]
  };
};
