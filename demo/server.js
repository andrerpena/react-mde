import { resolve } from "path";
import express from "express";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config.demo.dev";
import { name } from "../package.json";

const webpackCompiler = webpack(webpackConfig);
const PORT = 8080;

const app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));

app.get("*", (_, res) => res.sendFile(resolve(`${__dirname}/index.html`)));

app.listen(PORT, () =>
  console.log(`${name} running on http://localhost:${PORT}`)
);
