const path = require("path");

const loader = require("./utils/loader1");
const resolvePath = filePath => {
	return path.resolve(__dirname, filePath);
};
const config = {
	parallelism: 1,
	entry: resolvePath("src/main.js"),
	// mode: "production",
	mode: "development",
	output: {
		filename: "[name].[contenthash].js",
		path: resolvePath("dist")
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: path.resolve(__dirname, "utils/loader1")
				}
			}
		]
	}
	// optimization: {
	// 	// moduleIds: "deterministic",
	// 	runtimeChunk: "single",
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: "vendors",
	// 				chunks: "all"
	// 			}
	// 		}
	// 	}
	// }
};

module.exports = config;
