import { join } from "path";

export const reactStrictMode = true;
export const trailingSlash = true;
export function webpackDevMiddleware(config) {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  };
  return config;
}
export const sassOptions = {
  includePaths: [join(__dirname, "styles")],
};
