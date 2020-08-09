const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const fs = require("fs");
const { merge } = require("webpack-merge");
const pathResolutions = require("./paths");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const PnpWebpackPlugin = require("pnp-webpack-plugin");

const topDirectory = path.join(__dirname, "..");

const envKeys = () => {
  const env = dotenv.config().parsed;

  if (env) {
    return Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {};
};

<<<<<<< HEAD
const commonConfig = (env) => {
  const isEnvProduction = env.NODE_ENV === "production";
  const isEnvDevelopment = env.NODE_ENV === "development";

  process.env.BABEL_ENV = env.NODE_ENV;
  process.env.NODE_ENV = env.NODE_ENV;

  const getOutEnvironment = () => {
    return isEnvProduction ? {
      publicPath: "/",
      path: path.resolve(topDirectory, "dist"),
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
      globalObject: "this",
    } : {
      path: path.resolve(topDirectory, "dist"),
      filename: "bundle.[hash].js",
    };
  }
 

  return {
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction,
    context: topDirectory,
    devServer: {
      host: "localhost",
      port: 3500,
      contentBase: path.join(topDirectory, "public"),
      compress: true,
      watchContentBase: true,
      hot: true,
      overlay: {
        errors: true,
        warnings: true,
=======
const commonConfig = {
  devServer: {
    contentBase: path.join(topDirectory, "public"),
    compress: true,
    port: 3500,
    watchOptions: {
      aggregateTimeout: 500,
      poll: true,
    },
  },
  entry: path.resolve(topDirectory, "src", "index.tsx"),
  output: {
    path: path.resolve(topDirectory, "dist"),
    filename: "bundle.[hash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(topDirectory, "public", "index.html"),
    }),
    new webpack.DefinePlugin(envKeys()),
    new CopyPlugin({
      patterns: [{ from: path.resolve(topDirectory, "public"), to: path.resolve(topDirectory, "dist") }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }],
>>>>>>> develop
      },
      after: (app, server, compiler) => {
        const execSync = require("child_process").execSync;

        const port = server.options.port;
        const host = server.options.host;

        execSync(`osascript openChrome.applescript http://${host}:${port}`, {
          cwd: __dirname,
          stdio: "ignore",
        });
      },
    },
    entry: path.resolve(topDirectory, "src", "index.tsx"),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    output: getOutEnvironment(),
      optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: false,
            keep_fnames: false,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true,
            },
          },
          cssProcessorPluginOptions: {
            preset: ["default", { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(topDirectory, "public", "index.html"),
        ...(isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      new webpack.DefinePlugin(envKeys()),
      new CopyPlugin({
        patterns: [{ from: path.resolve(topDirectory, "public"), to: path.resolve(topDirectory, "dist") }],
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: "/",
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith(".map"));

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: "cdn",
        navigateFallback: "index.html",
        navigateFallbackBlacklist: [new RegExp("^/_"), new RegExp("/[^/?]+\\.[^/]+$")],
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }],
        },
        {
          test: /\.s?css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: "10000",
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
  };
};

module.exports = (env) => {
  return merge(commonConfig(env), pathResolutions);
};
