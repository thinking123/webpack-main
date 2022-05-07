const { getConfig, setConfig } = require("./webpack.config.js");
const chalk = require("chalk");
const path = require("path");
const rimraf = require("rimraf");
// const { webpack } = require("../lib/index.js");
const webpack1 = require("../lib/index.js");

const dllConfig = require("./webpack.dll.config");

// const dll = true;
const dll = false;

rimraf.sync(path.join(__dirname, "dll-dist"));

setConfig({ dll, html: false });

// await new Promise((res, rej) => {

// });

if (dll) {
	const compilerDll = webpack1(dllConfig);

	compilerDll.run(() => {
		runWebapck();
	});
} else {
	runWebapck();
}

function runWebapck() {
	const compiler = webpack1(getConfig());

	compiler.watch(
		{
			aggregateTimeout: 300,
			poll: undefined
		},
		// webpack1(config, (err, stats) => {
		(err, stats) => {
			console.log(stats.toString());

			if (err || stats.hasErrors()) {
				// [Handle errors here](#error-handling)
				// console.log(chalk.red("run webpack error", stats.toString()));
				process.exit(1);
			}

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
}
