// const b1 = require('./commonjs-main.js')
// const common1_fun1 = require("./commonjs/common1");
const usedFunction = (b) => {
	console.log('usedFunction' , b , common1_fun1)
}

const notUsedFunction = () => {
	console.log('usedFunction')
}

export {
	usedFunction,
	notUsedFunction
}
