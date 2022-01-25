const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require('webpack').container;
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "testing",
    projectName: "remote1",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'remote' },
        exposes: {
          './testing-remote1': './src/testing-remote1.tsx',
        }
      }),
    ]
  });
};
