const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "production",

  entry: ["./demo/client.js"],

  output: {
    filename: "bundle-prod.js",
    path: resolve(__dirname, "docs"),
    publicPath: "/react-mde/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".json"]
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.css/, use: ExtractTextPlugin.extract({ use: "css-loader" }) },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({ use: ["css-loader", "sass-loader"] })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
        use: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.eot|\.ttf|\.svg|\.woff2?/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },

  plugins: [new ExtractTextPlugin("bundle.css")]
};
