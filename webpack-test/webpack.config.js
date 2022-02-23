const path = require("path");
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
