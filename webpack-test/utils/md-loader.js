const path = require("path");
let count = 1;
function loader1(source) {
	this.addDependency(path.resolve(__dirname, "demo.js"));
	console.log("loader1 running12: ", count++);

	source = `

		function mdFun(){
			console.log('mdFun')
		}


		export default mdFun

	`;
	return source;
}

module.exports = loader1;
