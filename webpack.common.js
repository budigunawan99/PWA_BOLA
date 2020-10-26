const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = {
      entry: {
            index: './src/index.js',
            team: './src/scripts/view/team.js'
      },
      output: {
            publicPath: ASSET_PATH,
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js"
      },
      module: {
            rules: [
                  {
                        test: /\.html$/,
                        use: [
                              {
                                    loader: "html-loader",
                              },
                        ],
                  },
                  {
                        test: /\.css$/,
                        use: [
                              {
                                    loader: "style-loader"
                              },
                              {
                                    loader: "css-loader"
                              }
                        ]
                  },
                  {
                        test: /\.(svg|png|jpg|jpeg|gif)$/,
                        include: path.resolve(__dirname, "src/asset/"),
                        use: [
                              {
                                    loader: 'file-loader',
                                    options: {
                                          name: '[name].[ext]',
                                          outputPath: './asset/img/',
                                          publicPath: './asset/img/'
                                    }
                              },
                        ],
                  },
                  {
                        test: /\.(svg|png)$/,
                        exclude: path.resolve(__dirname, "src/asset/"),
                        use: [
                              {
                                    loader: 'file-loader',
                                    options: {
                                          name: '[name].[ext]',
                                          outputPath: './',
                                    }
                              },
                        ],
                  },
                  {
                        test: /\.(woff|woff2|ttf)$/,
                        use: [
                              {
                                    loader: 'file-loader',
                                    options: {
                                          name: '[name].[ext]',
                                          outputPath: './asset/font/',
                                          publicPath: './asset/font/'
                                    }
                              }
                        ]
                  },
                  {
                        test: /\.js$/,
                        exclude: ["/node_modules/"],
                        use: [
                              {
                                    loader: "babel-loader",
                                    options: {
                                          presets: ["@babel/preset-env"],
                                          plugins: [
                                                ['@babel/plugin-proposal-class-properties', {
                                                      "loose": true
                                                }]
                                          ]
                                    }
                              }
                        ]
                  },
            ]
      },
      plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                  favicon: "./src/favicon.ico",
                  template: "./src/index.html",
                  filename: "index.html",
                  chunks: ['index'],
                  inject: true
            }),
            new HtmlWebpackPlugin({
                  favicon: "./src/favicon.ico",
                  template: "./src/article.html",
                  filename: "article.html",
                  chunks: ['team'],
                  inject: true
            }),
            new webpack.DefinePlugin({
                  'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
            }),
            new workboxPlugin.InjectManifest({
                  swSrc: "./src/service-worker.js",
            }),
            new WebpackPwaManifest({
                  name: 'Premiere League Standings',
                  short_name: 'PLeague',
                  description: 'The Greatest League in The World',
                  background_color: '#69f0ae',
                  theme_color: '#69f0ae',
                  display: 'standalone',
                  scope: '.',
                  start_url: './index.html',
                  icons: [
                        {
                              src: path.resolve('src/android-chrome-192x192.png'),
                              sizes: '192x192'
                        },
                        {
                              src: path.resolve('src/android-chrome-512x512.png'),
                              size: '512x512' // you can also use the specifications pattern
                        },
                        {
                              src: path.resolve('src/logo.png'),
                              size: '512x512',
                              purpose: 'maskable'
                        }
                  ]
            }),
      ]
}