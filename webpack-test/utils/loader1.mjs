import path from 'path'
let count = 1;
function loader1(source) {
	this.addDependency(path.resolve(__dirname, "demo.js"));
	console.log("loader1 mjs running: ", count++);
	return source;
}


export default loader1
