const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());

    return config;
  },
};
