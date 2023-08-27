const d = {
	mode: "production",
	devtool: false,
	target: ["web", "es5"],
	output: {
		path: "/Users/a/github/zstack/zops-ui/main/dist",
		filename: "[name].[contenthash:8].js",
		chunkFilename: "[name].[contenthash:8].async.js",
		publicPath: "/",
		pathinfo: false
	},
	resolve: {
		symlinks: true,
		alias: {
			"react-router":
				"/Users/a/github/zstack/zops-ui/node_modules/react-router",
			"react-router-dom":
				"/Users/a/github/zstack/zops-ui/node_modules/react-router-dom",
			history: "/Users/a/github/zstack/zops-ui/node_modules/history-with-query",
			"regenerator-runtime":
				"/Users/a/github/zstack/zops-ui/node_modules/regenerator-runtime",
			react: "/Users/a/github/zstack/zops-ui/node_modules/react",
			"react-dom": "/Users/a/github/zstack/zops-ui/node_modules/react-dom",
			"@": "/Users/a/github/zstack/zops-ui/main/src",
			"@@": "/Users/a/github/zstack/zops-ui/main/src/.umi-production",
			umi: "/Users/a/github/zstack/zops-ui/node_modules/umi"
		},
		extensions: [
			".web.js",
			".wasm",
			".mjs",
			".js",
			".web.jsx",
			".jsx",
			".web.ts",
			".ts",
			".web.tsx",
			".tsx",
			".json"
		],
		modules: [
			"node_modules",
			"/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/node_modules"
		]
	},
	module: {
		rules: [
			/* config.module.rule('js') */
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				include: [["/Users/a/github/zstack/zops-ui/main"]],
				exclude: [/node_modules/, /\.mfsu/],
				use: [
					/* config.module.rule('js').use('babel-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/babel-loader/index.js",
						options: {
							sourceType: "unambiguous",
							babelrc: false,
							cacheDirectory: false,
							presets: [
								[
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/babel-preset-umi/app.js",
									{
										nodeEnv: "production",
										dynamicImportNode: true,
										autoCSSModules: true,
										svgr: true,
										env: {
											targets: {
												chrome: 49,
												firefox: 64,
												safari: 10,
												edge: 13,
												ios: 10
											}
										},
										import: []
									}
								]
							],
							plugins: []
						}
					}
				]
			},
			/* config.module.rule('ts-in-node_modules') */
			{
				test: /\.(jsx|ts|tsx)$/,
				include: [/node_modules/],
				use: [
					/* config.module.rule('ts-in-node_modules').use('babel-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/babel-loader/index.js",
						options: {
							sourceType: "unambiguous",
							babelrc: false,
							cacheDirectory: false,
							presets: [
								[
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/babel-preset-umi/app.js",
									{
										nodeEnv: "production",
										dynamicImportNode: true,
										autoCSSModules: true,
										svgr: true,
										env: {
											targets: {
												chrome: 49,
												firefox: 64,
												safari: 10,
												edge: 13,
												ios: 10
											}
										},
										import: []
									}
								]
							],
							plugins: []
						}
					}
				]
			},
			/* config.module.rule('js-in-node_modules') */
			{
				test: /\.(js|mjs)$/,
				include: [/node_modules/],
				exclude: [
					function () {
						/* omitted long function */
					}
				],
				use: [
					/* config.module.rule('js-in-node_modules').use('babel-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/babel-loader/index.js",
						options: {
							sourceType: "unambiguous",
							babelrc: false,
							cacheDirectory: false,
							presets: [
								[
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/babel-preset-umi/dependency.js",
									{
										nodeEnv: "production",
										dynamicImportNode: true
									}
								]
							]
						}
					}
				]
			},
			/* config.module.rule('images') */
			{
				test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
				use: [
					/* config.module.rule('images').use('url-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/url-loader/cjs.js",
						options: {
							limit: 10000,
							name: "static/[name].[hash:8].[ext]",
							esModule: false,
							fallback: {
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/file-loader/cjs.js",
								options: {
									name: "static/[name].[hash:8].[ext]",
									esModule: false
								}
							}
						}
					}
				]
			},
			/* config.module.rule('avif') */
			{
				test: /\.(avif)(\?.*)?$/,
				use: [
					/* config.module.rule('avif').use('file-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/file-loader/cjs.js",
						options: {
							name: "static/[name].[hash:8].[ext]",
							esModule: false
						}
					}
				]
			},
			/* config.module.rule('svg') */
			{
				test: /\.(svg)(\?.*)?$/,
				use: [
					/* config.module.rule('svg').use('file-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/file-loader/cjs.js",
						options: {
							name: "static/[name].[hash:8].[ext]",
							esModule: false
						}
					}
				]
			},
			/* config.module.rule('fonts') */
			{
				test: /\.(eot|woff|woff2|ttf)(\?.*)?$/,
				use: [
					/* config.module.rule('fonts').use('file-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/file-loader/cjs.js",
						options: {
							name: "static/[name].[hash:8].[ext]",
							esModule: false
						}
					}
				]
			},
			/* config.module.rule('plaintext') */
			{
				test: /\.(txt|text|md)$/,
				use: [
					/* config.module.rule('plaintext').use('raw-loader') */
					{
						loader:
							"/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/raw-loader/cjs.js"
					}
				]
			},
			/* config.module.rule('css') */
			{
				test: /\.(css)(\?.*)?$/,
				oneOf: [
					/* config.module.rule('css').oneOf('css-modules') */
					{
						resourceQuery: /modules/,
						use: [
							/* config.module.rule('css').oneOf('css-modules').use('extract-css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/mini-css-extract-plugin/dist/loader.js",
								options: {
									publicPath: "./"
								}
							},
							/* config.module.rule('css').oneOf('css-modules').use('css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/css-loader/dist/cjs.js",
								options: {
									importLoaders: 1,
									modules: {
										localIdentName: "[local]___[hash:base64:5]"
									}
								}
							},
							/* config.module.rule('css').oneOf('css-modules').use('postcss-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/node_modules/postcss-loader/src/index.js",
								options: {
									ident: "postcss",
									plugins: function () {
										/* omitted long function */
									}
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('css') */
					{
						use: [
							/* config.module.rule('css').oneOf('css').use('extract-css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/mini-css-extract-plugin/dist/loader.js",
								options: {
									publicPath: "./"
								}
							},
							/* config.module.rule('css').oneOf('css').use('css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/css-loader/dist/cjs.js",
								options: {
									importLoaders: 1
								}
							},
							/* config.module.rule('css').oneOf('css').use('postcss-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/node_modules/postcss-loader/src/index.js",
								options: {
									ident: "postcss",
									plugins: function () {
										/* omitted long function */
									}
								}
							}
						]
					}
				]
			},
			/* config.module.rule('less') */
			{
				test: /\.(less)(\?.*)?$/,
				oneOf: [
					/* config.module.rule('less').oneOf('css-modules') */
					{
						resourceQuery: /modules/,
						use: [
							/* config.module.rule('less').oneOf('css-modules').use('extract-css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/mini-css-extract-plugin/dist/loader.js",
								options: {
									publicPath: "./"
								}
							},
							/* config.module.rule('less').oneOf('css-modules').use('css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/css-loader/dist/cjs.js",
								options: {
									importLoaders: 1,
									modules: {
										localIdentName: "[local]___[hash:base64:5]"
									}
								}
							},
							/* config.module.rule('less').oneOf('css-modules').use('postcss-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/node_modules/postcss-loader/src/index.js",
								options: {
									ident: "postcss",
									plugins: function () {
										/* omitted long function */
									}
								}
							},
							/* config.module.rule('less').oneOf('css-modules').use('/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/less-loader/cjs.js') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/less-loader/dist/cjs.js",
								options: {
									lessOptions: {
										javascriptEnabled: true
									}
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('css') */
					{
						use: [
							/* config.module.rule('less').oneOf('css').use('extract-css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/mini-css-extract-plugin/dist/loader.js",
								options: {
									publicPath: "./"
								}
							},
							/* config.module.rule('less').oneOf('css').use('css-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/css-loader/dist/cjs.js",
								options: {
									importLoaders: 1
								}
							},
							/* config.module.rule('less').oneOf('css').use('postcss-loader') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/node_modules/postcss-loader/src/index.js",
								options: {
									ident: "postcss",
									plugins: function () {
										/* omitted long function */
									}
								}
							},
							/* config.module.rule('less').oneOf('css').use('/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/less-loader/cjs.js') */
							{
								loader:
									"/Users/a/github/zstack/zops-ui/node_modules/less-loader/dist/cjs.js",
								options: {
									lessOptions: {
										javascriptEnabled: true
									}
								}
							}
						]
					}
				]
			}
		]
	},
	optimization: {
		noEmitOnErrors: true,
		minimizer: [
			/* config.optimization.minimizer('terser') */
			new (require("/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/lib/webpack/plugins/terser-webpack-plugin.js"))(
				{
					terserOptions: {
						parse: {
							ecma: 8
						},
						compress: {
							ecma: 5,
							warnings: false,
							arrows: false,
							collapse_vars: false,
							comparisons: false,
							computed_props: false,
							hoist_funs: false,
							hoist_props: false,
							hoist_vars: false,
							inline: false,
							loops: false,
							negate_iife: false,
							properties: false,
							reduce_funcs: false,
							reduce_vars: false,
							switches: false,
							toplevel: false,
							typeofs: false,
							booleans: true,
							if_return: true,
							sequences: true,
							unused: true,
							conditionals: true,
							dead_code: true,
							evaluate: true
						},
						mangle: {
							safari10: true
						},
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true
						}
					},
					sourceMap: false,
					cache: true,
					parallel: true,
					extractComments: false
				}
			)
		]
	},
	plugins: [
		/* config.plugin('extract-css') */
		new (require("/Users/a/github/zstack/zops-ui/node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin.js"))(
			{
				filename: "[name].[contenthash:8].css",
				chunkFilename: "[name].[contenthash:8].chunk.css",
				ignoreOrder: true
			}
		),
		/* config.plugin('optimize-css') */
		new (require("/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/optimize-css-assets-webpack-plugin/index.js"))(
			{
				cssProcessorOptions: {
					parser: function () {
						/* omitted long function */
					}
				},
				cssProcessorPluginOptions: {
					preset: [
						"default",
						{
							mergeRules: false,
							minifyFontValues: {
								removeQuotes: false
							}
						}
					]
				}
			}
	
	),
		/* config.plugin('define') */
		new DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		}),
		/* config.plugin('friendly-error') */
		new (require("/Users/a/github/zstack/zops-ui/node_modules/@umijs/deps/compiled/friendly-errors-webpack-plugin/index.js"))(
			{
				clearConsole: false
			}
		)
	],
	performance: {
		hints: false
	},
	entry: {
		umi: ["/Users/a/github/zstack/zops-ui/main/src/.umi-production/umi.ts"]
	}
};
