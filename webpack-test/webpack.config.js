const path = require("path");
const resolvePath = filePath => {
	return path.resolve(__dirname, filePath);
};
const config = {
	entry: resolvePath("src/main.js"),
	output: {
		filename: "[name].js",
		path: resolvePath("dist")
	}
};

module.exports = config;
