const config = require("./webpack.config.js");
const chalk = require("chalk");
// const { webpack } = require("../lib/index.js");
const webpack1 = require("../lib/index.js");
// const compiler = webpack1(config);

// compiler.watch(
// 	{
// 		aggregateTimeout: 300,
// 		poll: undefined
// 	},
webpack1(config, (err, stats) => {
	if (err || stats.hasErrors()) {
		// [Handle errors here](#error-handling)
		console.log(chalk.red("run webpack error", stats.toString()));
		process.exit(1);
	}

	console.log(chalk.blue("running webpack..."));
	console.log(chalk.green(stats));
	// Done processing
});
