import { resolve } from "path";
import express from "express";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config.demo.dev";
import { name } from "../package.json";

const webpackCompiler = webpack(webpackConfig);
const port = 8000;

const app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));

app.get("*", (_, res) => res.sendFile(resolve(`${__dirname}/index.html`)));

app.listen(port, () =>
  console.log(`${name} running on http://localhost:${port}`)
);
