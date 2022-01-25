const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "testing";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          remote: 'remote@http://localhost:8080/remoteEntry.js',
        },
      }),
    ],
  });
};
