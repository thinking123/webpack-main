const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModuleReplacementPlugin = require('../lib/HotModuleReplacementPlugin')
const loader = require("./utils/loader1");
const resolvePath = filePath => {
	return path.resolve(__dirname, filePath);
};
const config = {
	parallelism: 1,
	entry: resolvePath("src/main.js"),
	// entry: resolvePath("src/commonjs-main.js"),
	// mode: "production",
	mode: "development",
	output: {
		filename: "[name].js",
		path: resolvePath("dist")
	},
	devServer: {
		port: 9001
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: path.resolve(__dirname, "utils/loader1")
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			},
			{
				test: /\.(le|c)ss$/,
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
					},
					{
						loader: require.resolve("less-loader"),
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true
							}
							// webpackImporter: false,
						}
					}
				]
			}
		]
	},

	plugins: [
		// new MiniCssExtractPlugin(),
		new HotModuleReplacementPlugin(),
		// new HtmlWebpackPlugin({
		// 	title: "My Appsdfsdfsfd"
		// })
	],
	optimization: {
		// 141 , 60 , 106
		// moduleIds: "deterministic",
		// runtimeChunk: "single",
		minimize: false
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
};

module.exports = config;
