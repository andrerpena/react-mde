module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: { version: 3, proposals: true }
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
  };
};
