var wp = require("@cypress/webpack-preprocessor");

module.exports = function(on) {
    var options = {
        webpackOptions: require("../webpack.config.js")
    };
    on("file:preprocessor", wp(options));
};
