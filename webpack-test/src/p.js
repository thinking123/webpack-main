const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { DllReferencePlugin, DefinePlugin } = require('webpack')

// const smp = new SpeedMeasurePlugin()
const path = require('path')
const httpConfig = require('../../config/src/lib/config.json')
const systemConfig = require('../../config/src/lib/system.json')

const resolvePath = (pathUrl) => {
  return path.resolve(process.cwd(), 'apps/ui/', pathUrl)
}

const resolveCwd = (pathUrls) => {
  pathUrls = Array.isArray(pathUrls) ? pathUrls : [pathUrls]
  return pathUrls.map((url) => path.resolve(process.cwd(), url))
}

const getBabelConfig = (sourceMaps) => ({
  sourceMaps,
  compact: false,
  plugins: [
    [
      // 支持 ts 语言
      require.resolve('@babel/plugin-transform-typescript'),
      {
        //解析 <> === jsx
        isTSX: true,
      },
    ],
    // sourceMaps && require.resolve('react-refresh/babel'),
  ].filter(Boolean),
  presets: [
    [
      require('@babel/preset-react'),
      // {
      //   throwIfNamespace: false,
      // },
    ],
    [
      require('@babel/preset-env'),
      {
        loose: true,
        modules: false,
      },
    ],
  ],
})

const isAnalyzer = process.env.NODE_ENV === 'analyzer'
const isSourcemap = process.env.NODE_ENV === 'sourcemap'
//dev start 模式
const isDev = process.env.start === 'start'
//../../../../libs/util/common/src/index.ts

const outputPath = path.resolve(process.cwd(), 'dist/ui')

const getConfig = (env = {}) => {
  const isBuild = !!env.WEBPACK_BUILD
  const sourceMap = !isBuild || isSourcemap
  // const sourceMap = true
  // const enableHMR = isDev
  const enableHMR = false
  console.log(
    'isBuild ',
    'isAnalyzer',
    'isSourcemap',
    'isDev',
    isBuild,
    isAnalyzer,
    isSourcemap,
    isDev,
  )
  const config = {
    entry: {
      browserSupport: `!!${resolvePath('browser-detect.js')}`,
      main: resolvePath('src/main.tsx'),
    },
    mode: isDev ? 'development' : 'production',
    output: {
      publicPath: '/',
      path: outputPath,
      filename: '[name].[hash].js',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.less', '.json', '.svg', '.ico'],
      alias: {
        '@zops-ui/ui-components/common': resolveCwd([
          'libs/ui-components/common/src/index.ts',
        ]),
        '@zops-ui/ui-components/layout': resolveCwd([
          'libs/ui-components/layout/src/index.ts',
        ]),
        '@zops-ui/ui-components/form': resolveCwd([
          'libs/ui-components/form/src/index.ts',
        ]),
        '@zops-ui/ui-components/business': resolveCwd([
          'libs/ui-components/business/src/index.ts',
        ]),
        // '@zops-ui/ui-style/index.less': resolveCwd([
        //   'libs/ui-style/src/index.less',
        // ]),
        '@zops-ui/ui-style': resolveCwd(['libs/ui-style/src/']),
        '@zops-ui/config': resolveCwd(['libs/config/src/index.ts']),
        '@zops-ui/ui/feature$': resolveCwd(['libs/ui/feature/src/index.ts']),
        '@zops-ui/ui/feature': resolveCwd(['libs/ui/feature/src']),
        '@zops-ui/ui/components': resolveCwd([
          'libs/ui/components/src/index.ts',
        ]),
        '@zops-ui/util/zql': resolveCwd(['libs/util/zql/src/index.ts']),
        '@zops-ui/util/common': resolveCwd(['libs/util/common/src/index.ts']),
        '@zops-ui/util/request-client': resolveCwd([
          'libs/util/request-client/src/index.ts',
        ]),
        '@zops-ui/ts-types': resolveCwd(['libs/ts-types/src/index.ts']),
        '@zops-ui/ui/constants': resolveCwd(['libs/ui/constants/src/index.ts']),
        '@zops-ui/generated-api-type': resolveCwd([
          'libs/generated-api-type/src/index.ts',
        ]),
        '@zops-ui/services': resolveCwd(['libs/services/src/index.ts']),
        '@zops-ui/assets': resolveCwd(['libs/assets/src/']),
        '@zops-ui/engine': resolveCwd(['libs/engine/src/']),
      },
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      hot: true,
      static: {
        directory: path.join(process.cwd(), 'dist/ui'),
      },
      proxy: {
        '/actions': {
          target: `http://${httpConfig.host}:${httpConfig.apiPort}`,
          // changeOrigin: true,
          // pathRewrite: { '^/api': '' },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        // {
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: require.resolve('babel-loader'),
        //       options: getBabelConfig(!isBuild),
        //     },
        //   ],
        // },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            // {
            //   loader: require.resolve('babel-loader'),
            //   options: getBabelConfig(!isBuild),
            // },
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: () => ({
                  // 开启 react HMR , todo 开启 DLL HMR 失败
                  before: [enableHMR && ReactRefreshTypeScript()].filter(
                    Boolean,
                  ),
                }),
                transpileOnly: isDev,
                compilerOptions: {
                  declaration: false,
                  sourceMap,
                },
                configFile: resolvePath('tsconfig.json'),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isBuild
              ? MiniCssExtractPlugin.loader
              : require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: false,
              },
            },
          ].filter((f) => f),
        },
        {
          test: /\.less$/,
          use: [
            isBuild
              ? MiniCssExtractPlugin.loader
              : require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]_[hash]',
                  localIdentHashDigestLength: 10,
                  localIdentHashDigest: 'base64',
                  auto: (filename) => {
                    const uiStyle = path.join(
                      process.cwd(),
                      'libs/ui-style/index.less',
                    )

                    if (filename === uiStyle) {
                      return false
                    }

                    // console.log('filename', filename)
                    return (
                      /module\.less/.test(filename) ||
                      /ui\/feature/.test(filename) ||
                      /color\.less/.test(filename)
                    )
                  },
                },
              },
            },
            // {
            //   loader: require.resolve('postcss-loader'),
            //   options: {
            //     postcssOptions: {
            //       plugins: ['autoprefixer'],
            //     },
            //     sourceMap,
            //   },
            // },
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
                sourceMap,
              },
            },
          ].filter((f) => f),
        },
        {
          test: /\.(svg|ico|png)$/,
          type: 'asset',
        },
        {
          test: /\.svg$/i,
          // 处理 svgs 文件夹，ts 文件
          issuer: /\.ts$/,
          dependency: { not: ['url'] },
          type: 'javascript/auto',
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      // svgr 会 从 svg 删除 viewBox ，关闭这个功能
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              },
            },
            {
              loader: 'url-loader',
              options: {
                limit: false,
                // name: "assets/[name]-[hash]",
                name: 'assets/[name]-[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      // minimize: false,
      splitChunks: {
        cacheGroups: {
          /* split chunks 规则 , 优先级依次提高
          1. main 入口的代码
          2. main 入口node_modules 和 async node_modules ， minChunks >= 2
          3. async 共享代码  minChunks >= 2
          */
          // default: {
          //   maxSize: 1024 * 1024 * 2,
          //   idHint: 'main',
          //   chunks: 'initial',
          //   minChunks: 1,
          //   priority: 1,
          //   reuseExistingChunk: true,
          //   test: !/[\\\\/]node_modules[\\\\/]/i,
          // },
          default: false,
          defaultVendors: {
            chunks: 'all',
            idHint: 'vendors',
            minChunks: 2,
            priority: 2,
            reuseExistingChunk: true,
            test: /[\\\\/]node_modules[\\\\/]/i,
          },
          defaultAsyncVendors: {
            chunks: 'async',
            idHint: 'async-vendors',

            minChunks: 2,
            priority: 3,
            reuseExistingChunk: true,
            test: /[\\\\/]node_modules[\\\\/]/i,
          },
          // MiniCssExtractPlugin build 使用 , css 优先级高于 js
          initCss: {
            chunks: 'initial',
            idHint: 'initial-css',
            minChunks: 1,
            name: 'init-css',
            priority: 11,
            type: 'css/mini-extract',
            test: /(le|c)ss$/i,
          },
          // asyncCss: {
          //   chunks: 'async',
          //   idHint: 'async-css',
          //   name:'async-css',
          //   minChunks: 1,
          //   priority: 12,
          //   type:'css/mini-extract',
          //   test: /(le|c)ss$/i,
          // },
        },
      },
    },
    plugins: [
      // new CopyPlugin({
      //   patterns: [{ from: resolvePath('browser-detect.js'), to: outputPath }],
      // }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isDev ? 'development' : 'production',
        ),
      }),
      // build 模式 删除 重复的 css
      isBuild &&
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      // build 模式 提取 css
      isBuild &&
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
        }),
      //开发模式使用Dll
      isDev &&
        new DllReferencePlugin({
          manifest: path.resolve(process.cwd(), 'dist/ui/library.json'),
          extensions: ['.js', 'svg'],
          context: process.cwd(),
        }),
      // 开启 react HMR
      enableHMR && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: systemConfig.info.name,
        template: resolvePath(isDev ? 'index.dll.html' : 'index.html'),
      }),
    ].filter(Boolean),
  }

  if (isBuild) {
    config.devtool = 'source-map'
    if (isSourcemap) {
      config.devtool = 'source-map'
      config.optimization = {
        ...(config.optimization || {}),
        minimize: false,
        concatenateModules: false,
      }
    }
    config.optimization = {
      ...(config.optimization || {}),
      moduleIds: 'named',
      chunkIds: 'named',
    }
  } else {
    config.devtool = 'source-map'

    // config.optimization = {
    //   runtimeChunk: true,
    // }
    // config.experiments = {
    //   lazyCompilation: {
    //     test: (module) => {
    //       const request = module.request
    //       if (
    //         request.indexOf('src/main.tsx') > -1 ||
    //         request.indexOf('deployment-management/host-deployment') > -1
    //       ) {
    //         return false
    //       }

    //       return true
    //     },
    //   },
    // }
    if (isAnalyzer) {
      config.stats = {
        ...config.stats,
        logging: 'verbose',
      }
    }

    config.stats = {
      warningsFilter: /export .* was not found in/,
    }
  }

  return config
}
module.exports = getConfig
