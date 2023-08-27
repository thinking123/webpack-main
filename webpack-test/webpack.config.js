const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rimraf = require("rimraf");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { DllReferencePlugin, DefinePlugin } = require("../lib");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const TerserPlugin = require('terser-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const JsxInlineModuleId = require("./custom-hooks/jsx-inline-module-id-hook");
const JsxSourceMap = require("./custom-hooks/source-map-hook");
const HotModuleReplacementPlugin = require("../lib/HotModuleReplacementPlugin");
const InconsistentVersionofDuplicateModulePlugin = require('./plugins/inconsistentVersionofDuplicateModulePlugin')
const smp = new SpeedMeasurePlugin();

const loader = require("./utils/loader1");
const { limit } = require("@webassemblyjs/ast/lib/nodes");
const resolvePath = filePath => {
	return path.resolve(__dirname, filePath);
};

let dll = false;
let html = false;
const setConfig = (
	{ dll: _dll, html: _html } = {
		dll: false,
		html: false
	}
) => {
	dll = _dll;
	html = _html;
};

rimraf.sync(path.join(__dirname, "dist"));

// `data:text/jsx,import React from 'react';const App = () => {return (<div>sdfsdfsdf</div>)}export {App}`
let jsx = `import React from 'react';
const App = () => {
	const [s,st]=React.useState(0)
	return (
		<div>
		sdfsdfsdf
		<div>
		"fs" : {s}
		</div>
		</div>
	)
}

export {App}
`;

jsx = `


export default function fs(){
	let b = 12
	console.log("sdf" , b)
}
`;

/*
.md -> .jsx
encodeURIComponent(jsx) -> sourcefile-line${index}.jsx
*/
// jsx=`data:text/jsx,${encodeURIComponent(jsx)}`
jsx = `data:text/js,${encodeURIComponent(jsx)}`;

// const jsx1 = `data:text/js,${encodeURIComponent(jsx)}`;
fs.writeFileSync(
	path.join(__dirname, "./a.js"),
	`
	import fs from "${jsx}"
	import fs1 from "${jsx};"
	import mdFun from "./b.md"
	fs()
	fs1()
	mdFun()
`
);
const getConfig = () => ({
	parallelism: 1,
	devtool: "source-map",
	// devtool: "eval",

	// entry: () => `!!${resolvePath("src/main.js")}`,

	entry: {
		// "browser-detect":  path.join(__dirname, "./src/browser-detect.js"),

		main: {
			// import: jsx,
			// import: path.join(__dirname, "./a.js")
			// import: path.join(__dirname, "./src/a.js")
			// import: path.join(__dirname, "./src/index.tsx")
			import: path.join(__dirname, "./src/index.ts")
			// import: path.join(__dirname, "./src/system.js")
			// import: path.join(__dirname, "./src/index.ts")
			// dependOn:['b']
		}
		// d: resolvePath("src/d.js"),
		// b: resolvePath("src/b.js"),
		// a: resolvePath("src/a.js"),
		// c:{
		// 	import: resolvePath("src/c.js"),
		// 	dependOn:['a']
		// },
	},
	// entry: () => resolvePath("lazy-compilation/index.js"),
	// entry: {
	// 	main: {
	// 		// import: resolvePath("src/main.js"),
	// 		import: resolvePath("src/split-chunk/index.js")
	// 		// import: resolvePath("src/commonjs-main.js"),
	// 		// layer: "name of layer",
	// 		// chunkLoading: false

	// 		// chunkLoading: 'jsonp',
	// 		// asyncChunks: true, // Create async chunks that are loaded on demand.
	// 	}
	// 	// other: { import: resolvePath("src/other.js") , runtime:"funk" },
	// 	// lodash1: ["lodash"]
	// },
	// target: "node",
	// target: "system",
	experiments: {
		// lazyCompilation: {
		// 	test: () => true
		// }
		// asyncWebAssembly: true,
		// buildHttp: true,
		// layers: true
		// lazyCompilation: true,
		// outputModule: true,
		// syncWebAssembly: true,
		// topLevelAwait: true,
	},

	// entry: resolvePath("src/commonjs-main.js"),
	// mode: "production",
	mode: "development",
	// externals: {
	// 	// lodash: "_",
	// 	react: "react",
	// 	"react-dom": "reactDom",
	// },
	// externalsType: "commonjs",
	output: {
		filename: "[name].js",
		path: resolvePath("dist"),
		// publicPath: "/static/",
		// library: {
		//   name: 'MyLibrary',
		//   type: 'system',
		// },
		library: "umd-test-1",
		libraryTarget: "umd",
		// jsonpFunction -> chunkLoadingGlobal
		chunkLoadingGlobal: "jsonptest_fun1"
		// library: {
		// 	// name: 'MyLibrary',
		// 	type: "commonjs"
		// }
		// library: "MyLibrary",
		// publicPath: "fucksdf",
		// library: {
		// 	name: "webpackNumbers",
		// 	type: "umd"
		// }
	},
	devServer: {
		port: 9001
	},
	resolve: {
		extensions: [".js", ".json", ".tsx", ".ts"],
		alias: {
			fuck$: path.join(__dirname, "./src/index.js"),
			fuck: path.join(__dirname, "./src")
		}
	},
	module: {
		// defaultRules: [
		// 	{
		// 		mimetype: "application/node",
		// 		type: "javascript/auto"
		// 	}
		// ],
		rules: [
			// { test: /\.svg$/, use: ["@svgr/webpack"] },
			{
				test: /\.tsx?$/,
				// mimetype: "text/jsx",
				use: [
					// {
					//   loader: require.resolve("babel-loader"),
					//   options: babelConfig,
					// },
					{
						loader: require.resolve("ts-loader"),
						options: {
							// getCustomTransformers: () => ({
							//   before: [isDevelopment && ReactRefreshTypeScript()].filter(
							//     Boolean
							//   ),
							// }),
							transpileOnly: false,
							// onlyCompileBundledFiles: true,
							compilerOptions: {
								declaration: false
								// skipLibCheck: true
							},
							configFile: path.resolve(__dirname, "tsconfig.json")
						}
					}
				]
			},
			// {
			// 	mimetype: "text/js",
			// 	use: [
			// 		{
			// 			loader: "babel-loader",
			// 			options: {
			// 				sourceMaps: true,
			// 				presets: ["@babel/preset-env"]
			// 			}
			// 		}
			// 		// {
			// 		// 	loader: path.resolve(__dirname, "utils/jsx-loader.js")
			// 		// }
			// 	]
			// },
			// {
			// 	test: /\.md$/,
			// 	use: [
			// 		{
			// 			loader: "babel-loader",
			// 			options: {
			// 				sourceMaps: true,
			// 				presets: ["@babel/preset-env"]
			// 			}
			// 		},
			// 		{
			// 			loader: path.resolve(__dirname, "utils/md-loader.js")
			// 		}
			// 	]
			// },,
			{
				test: /\.js$/,
				use: {
					loader: path.join(__dirname, "utils/loader1.js")
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				// issuer: /\.js$/,
				// dependency: { not: ["url"] },
				// type: "javascript/auto",
				// use: [
				// 	{
				// 		loader: require.resolve("url-loader"),
				// 		options: {
				// 			esModule: false,
				// 			limit: false
				// 		}
				// 	}
				// ]
				type: "asset/resource"
				// type: "asset/inline",
			},
			{
				// test: /\.(le|c)ss$/,
				test: /\.(less)(\?.*)?$/,
				oneOf: [
					{
						resourceQuery: /modules/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader
							},
							{
								loader: require.resolve("css-loader"),
								options: {
									importLoaders: 1,
									modules: {
										localIdentName: "[local]___[hash:base64:5]"
									}
									// sourceMap: true,
									// modules: {
									// 	mode: "local",
									// 	localIdentName: "[local]_[hash:base64]",
									// 	localIdentHashDigestLength: 10,
									// 	namedExport: false,
									// 	exportGlobals: true

									// },
									// esModule: true
								}
							},

							// {
							// 	loader: require.resolve("postcss-loader"),
							// 	options: {
							// 		ident: "postcss",
							// 		plugins: function () {
							// 			/* omitted long function */
							// 		}
							// 	}
							// },
							{
								loader: require.resolve("less-loader"),
								options: {
									sourceMap: true,
									lessOptions: {
										javascriptEnabled: true,
										math: "always"
									}
									// webpackImporter: false,
								}
							}
						]
					},
					{
						use: [
							// {
							// 	loader: require.resolve("style-loader")
							// },
							{
								loader: MiniCssExtractPlugin.loader
							},
							{
								loader: require.resolve("css-loader"),
								options: {
									importLoaders: 1
									// sourceMap: true,
									// modules: {
									// 	mode: "local",
									// 	localIdentName: "[local]_[hash:base64]",
									// 	localIdentHashDigestLength: 10,
									// 	namedExport: false,
									// 	exportGlobals: true

									// },
									// esModule: true
								}
							},

							// {
							// 	loader: require.resolve("postcss-loader"),
							// 	options: {
							// 		ident: "postcss",
							// 		plugins: function () {
							// 			/* omitted long function */
							// 		}
							// 	}
							// },
							{
								loader: require.resolve("less-loader"),
								options: {
									sourceMap: true,
									lessOptions: {
										javascriptEnabled: true,
										math: "always"
									}
									// webpackImporter: false,
								}
							}
						]
					}
				]
			}
		]
	},

	plugins: [
		// new DefinePlugin({
		// 	Pro: JSON.stringify(true),
		// 	Pro1: JSON.stringify("pro"),
		// 	"process.env.NODE_ENV": JSON.stringify({ fuck: "12" })
		// }),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new InconsistentVersionofDuplicateModulePlugin(),
		// new HotModuleReplacementPlugin(),
		// new HtmlWebpackPlugin(),
		// new BundleAnalyzerPlugin()

		// dll &&
		// 	new DllReferencePlugin({
		// 		context: path.join(__dirname, "dll"),
		// 		// manifest: require("./build/library/library.json")
		// 		// scope: "beta1",
		// 		name:'dll',
		// 		manifest: require.resolve(
		// 			path.join(__dirname, "dll-dist", "beta12-manifest.json")
		// 		)
		// 	}),
		dll &&
			new DllReferencePlugin({
				// scope: "dll",
				manifest: require("./dll-dist/beta12-manifest.json"), // eslint-disable-line
				extensions: [".js", ".jsx"],
				context: path.join(__dirname, "dll")
			}),

		// new JsxInlineModuleId({
		// 	disabled: false
		// }),
		// new JsxSourceMap(),

		html &&
			function copyHtml(compiler) {
				const files = new Set();

				let _outputPath = "";
				compiler.hooks.assetEmitted.tap("hooks", (file, info) => {
					console.log("info", info);

					const { outputPath, targetPath } = info;
					_outputPath = outputPath;
					const htmlFilePath = targetPath
						.replace(outputPath, "")
						.replace(/^\//, "");

					console.log("htmlFilePath", htmlFilePath);

					files.add(htmlFilePath);
				});

				compiler.hooks.done.tap("hooks", () => {
					const html = `<!DOCTYPE html>
					<html>

					<head>
						<meta charset="utf-8" />
						<title>webpack js</title>

						<% _.forEach(files, function(file) { %><script src="<%= file %>" ></script><% }); %>
					</head>

					<body>
					</body>

					</html>
					`;
					const compiled = _.template(html);

					const str = compiled({
						files: Array.from(files)
					});

					console.log("str:", str);

					fs.writeFileSync(path.join(_outputPath, "index.html"), str);
				});
			}
	].filter(Boolean),
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					mangle: {
						keep_fnames: true,
						keep_classnames: true
					}
					// sourceMap:true
				}
			})
		],
		// 141 , 60 , 106
		// moduleIds: "deterministic",
		// runtimeChunk: "single",
		minimize: false,
		concatenateModules: false,
		moduleIds: "named",
		chunkIds: "named",

		// concatenateModules:false,
		// usedExports: true,

		// minimize: true,
		// minimizer: [new TerserPlugin()],
		// splitChunks: {
		// 	chunks: "all",
		// 	minSize: 0,
		// 	minChunks: 2
		// 	// default:{
		// 	// 	priority: 20
		// 	// },
		// 	// cacheGroups: {
		// 	// 	default: {
		// 	// 		idHint: "default idHint",
		// 	// 		// minChunks: 1,
		// 	// 		priority: -20,
		// 	// 		// minChunks: 1,
		// 	// 		// reuseExistingChunk: true
		// 	// 		// test: md => {
		// 	// 		// 	return !/[\\\\/]node_modules[\\\\/]/i.test(md.nameForCondition());
		// 	// 		// }
		// 	// 	}
		// 	// }
		// }
		splitChunks: {
			// chunks: "all",
			// minSize: 2,
			// minChunks: 1,
			cacheGroups: {}
			// default: {
			// 	minSize:1
			// },
			// defaultVendors: false,
			// 	// dep1: {
			// 	// 	name:"bfun",
			// 	// 	enforce: true,
			// 	// 	reuseExistingChunk: true,
			// 	// 	// maxSize: 100,
			// 	// 	chunks:'all',
			// 	// 	minSize: 1,
			// 	// 	minChunks:1,
			// 	// 	usedExports: true
			// 	// },
			// 	css: {
			// 		chunks: "all",
			// 		idHint: "css1",
			// 		name: "css2",
			// 		minChunks: 1,
			// 		// minSize: 1,
			// 		priority: 2,
			// 		reuseExistingChunk: true,
			// 		type: "css/mini-extract",
			// 		test: /(le|c)ss$/i
			// 	}
			// 	// dep2: {
			// 	// 	name:"dep2-name-cacheGroups",
			// 	// 	reuseExistingChunk: true,
			// 	// 	// maxSize: 121,
			// 	// 	minSize: 1
			// 	// },
			// 	// dep3: {
			// 	// 	name:"dep3-name-cacheGroups",
			// 	// 	enforce: true,
			// 	// 	reuseExistingChunk: true,
			// 	// 	// maxSize: 200,
			// 	// 	minSize: 1
			// 	// }
			// }
		}
	}
});

// module.exports = smp.wrap(config);
// module.exports = config;
module.exports = { getConfig, setConfig };

// module.exports.setConfig = setConfig;
