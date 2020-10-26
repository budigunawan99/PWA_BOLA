const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
      mode: "development",
      plugins: [
            new FriendlyErrorsWebpackPlugin(),
            new BundleAnalyzerPlugin()
      ],
      devServer: {
            quiet: true
      },
})