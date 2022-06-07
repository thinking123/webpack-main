const path = require("path");
let count = 1;
function loader1(source) {
	this.addDependency(path.resolve(__dirname, "demo.js"));
	console.log("loader1 running12: ", count++);
	return source;
}

module.exports = loader1;
