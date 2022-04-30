const common1_fun1 = require("./commonjs/common1");
if (common1_fun1) {
	const { common2_fun1 } = require("./commonjs/common2");
	common2_fun1();
}

common1_fun1();
