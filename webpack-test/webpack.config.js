const path = require("path");
const resolvePath = filePath => {
	return path.resolve(__dirname, filePath);
};
const config = {
	entry: resolvePath("src/main.js"),
	// mode: "production",
	mode: "development",
	output: {
		filename: "[name].js",
		path: resolvePath("dist")
	},
	optimization: {
		runtimeChunk: "single"
	}
};

module.exports = config;
