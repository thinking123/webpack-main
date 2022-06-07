const path = require("path");
const { DllPlugin } = require("../lib");

module.exports = {
	mode: "development",
	context: __dirname,
	// resolve: {
	// 	extensions: [".js"]
	// },

	// entry: {
	// 	library: ["lodash"]
	// },
	// output: {
	// 	// filename: "[name].dll.js",
	// 	// path: path.resolve(__dirname, "./dll-dist"),
	// 	context: __dirname,
	// 	path: path.join(__dirname, "./dll-dist", "manifest.json"),
	// 	name: "[name]_[fullhash]"
	// },

	resolve: {
		extensions: [".js"]
	},
	entry: {
		// library:[
		// 	'lodash'
		// ]

		library: ["./src/a.js", "./src/b.js"]

		// beta12: {
		// 	import: path.join(__dirname, "src/index.js")
		// 	// library: {
		// 	// 	name: "AnotherLibrary12",
		// 	// 	type: "commonjs"
		// 	// }
		// }
		// beta12sdfdsfsdfsdf: {
		// 	import: path.join(__dirname, "dll/src/a.js"),
		// 	library: {
		// 		name: "AnotherLibrary12sdfsdfsfsdfsdfsdfdsf",
		// 		type: "var"
		// 	}
		// }
	},
	// experiments: {
	// 	outputModule: true
	// },
	output: {
		path: path.join(__dirname, "dll-dist"),
		// filename: "MyDll.[name].js",
		// library: {
		// 	name: "[name]_[fullhash]",
		// 	type:'var'
		// 	// type: "commonjs-module"
		// }
		// path: path.resolve(__dirname, './build/library'),
		library: "[name]"
		// library: "[name]_[fullhash]" // 设置 lib var 名称 :var beta12_12131ksdlf
	},
	plugins: [
		new DllPlugin({
			// entryOnly: false,
			// path: path.join(__dirname, "dll-dist", "[name]-manifest.json"), // manifest json 文件名称
			// name: "[name]_[fullhash]" // manifest json name : {name : [name]_[fullhash]}

			name: "[name]",
			// path: './build/library/[name].json'

			path: path.join(__dirname, "dll-dist", "[name]-manifest.json")
		})
	]
};
