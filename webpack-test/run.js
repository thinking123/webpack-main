const config = require("./webpack.config.js");
const chalk = require("chalk");
// const { webpack } = require("../lib/index.js");
const webpack1 = require("../lib/index.js");
const compiler = webpack1(config);

compiler.watch(
	{
		aggregateTimeout: 300,
		poll: undefined
	},
	// webpack1(config, (err, stats) => {
	(err, stats) => {
		if (err || stats.hasErrors()) {
			// [Handle errors here](#error-handling)
			// console.log(chalk.red("run webpack error", stats.toString()));
			process.exit(1);
		}

		console.log(stats.toString());

		/*

assets by status 13.8 KiB [cached] 2 assets
asset index.html 256 bytes [compared for emit]
runtime modules 6.72 KiB 9 modules
cacheable modules 259 bytes
  ./webpack-test/src/main.js 103 bytes [built] [code generated]
  ./webpack-test/src/util/util-export-start.js 156 bytes [built] [code generated]
webpack 5.65.0 compiled successfully in 283 ms

		*/
	}
);
