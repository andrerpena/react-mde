import * as fs from 'fs';
import * as express from 'express';
import * as colors from 'colors';
import * as webpackMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import * as webpackConfig from '../webpack.config.demo.dev';
import * as opn from 'opn';
const packageJson  = require('../package.json');

const webpackCompiler = webpack(webpackConfig as any);
const port = 4000;

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));
app.use((req, res) => res.status(200).send(require('./index.html')));

app.listen(port, '0.0.0.0', () => {
    const demoUrl = `http://localhost:${port}/`;
    console.log(colors.green(`${packageJson.name} at ${demoUrl}`));
    opn(demoUrl);
});
