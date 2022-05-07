const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rimraf = require("rimraf");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { DllReferencePlugin } = require("../lib");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const HotModuleReplacementPlugin = require("../lib/HotModuleReplacementPlugin");

const smp = new SpeedMeasurePlugin();

const loader = require("./utils/loader1");
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
const getConfig = () => ({
	parallelism: 1,
	// entry: () => resolvePath("src/main.js"),
	entry: () => resolvePath("lazy-compilation/index.js"),
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
	experiments: {
		lazyCompilation: {
			test: () => true
		}
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
	// 	lodash: {
	// 		commonjs: "lodash",
	// 		// commonjs2: "lodash",
	// 		// amd: "lodash",
	// 		// root: "_"
	// 	}
	// },
	output: {
		filename: "[name].js",
		path: resolvePath("dist")
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
		extensions: [".js", ".json", ".tsx"],
		alias: {
			fuck$: path.join(__dirname, "./src/index.js"),
			fuck: path.join(__dirname, "./src")
		}
	},
	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: path.resolve(__dirname, "utils/loader1")
			// 	}
			// },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: require.resolve("style-loader")
					},
					// {
					// 	loader: MiniCssExtractPlugin.loader
					// },
					{
						loader: require.resolve("css-loader"),
						options: {
							sourceMap: true,
							modules: {
								mode: "local",
								localIdentName: "[local]_[hash:base64]",
								localIdentHashDigestLength: 10,
								namedExport: false,
								exportGlobals: true
								// auto: filename => {
								// 	wfs(filename);
								// 	return !/node_modules/.test(filename);
								// }
							},
							esModule: true
						}
					}
					// {
					// 	loader: require.resolve("less-loader"),
					// 	options: {
					// 		sourceMap: true,
					// 		lessOptions: {
					// 			javascriptEnabled: true
					// 		}
					// 		// webpackImporter: false,
					// 	}
					// }
				]
			}
		]
	},

	plugins: [
		// new MiniCssExtractPlugin(),
		// new HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin(),
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
		// minimizer: [TerserPlugin()],
		// 141 , 60 , 106
		// moduleIds: "deterministic",
		// runtimeChunk: "single",
		minimize: false
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
		// splitChunks: {
		// 	chunks: "all",
		// 	cacheGroups: {
		// 		dep1: {
		// 			name:"dep1-name-cacheGroups",
		// 			test:/main/,
		// 			enforce: true,
		// 			maxSize: 70,
		// 			minSize: 1
		// 		},
		// 		dep2: {
		// 			name:"dep2-name-cacheGroups",
		// 			test:/common1/,
		// 			enforce: true,
		// 			maxSize: 121,
		// 			minSize: 71
		// 		},
		// 		dep3: {
		// 			name:"dep3-name-cacheGroups",
		// 			test:/common2/,
		// 			enforce: true,
		// 			maxSize: 200,
		// 			minSize: 130
		// 		}
		// 	}
		// }
	}
});

// module.exports = smp.wrap(config);
// module.exports = config;
module.exports = { getConfig, setConfig };

// module.exports.setConfig = setConfig;
