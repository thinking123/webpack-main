const { Compilation } = require("../../lib/index");
const { RawSource } = require("webpack-sources");
const { makePathsAbsolute } = require("../../lib/util/identifier");

class JsxSourceMap {
	constructor(options) {}
	apply(compiler) {
		compiler.hooks.compilation.tap("JsxSourceMapDevToolPlugin", compilation => {
			const options = compiler.options;
			if (options.devtool) {
				const evalWrapped = options.devtool.includes("eval");

				if (!evalWrapped) {
					compilation.hooks.processAssets.tapAsync(
						{
							name: "JsxSourceMapDevToolPlugin",
							stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
							additionalAssets: true
						},
						(assets, callback) => {
							const chunkGraph = compilation.chunkGraph;
							const context = compilation.options.context;
							const root = compilation.compiler.root;
							const cachedAbsolutify = makePathsAbsolute.bindContextCache(
								context,
								root
							);

							for (const file of Object.keys(assets)) {
								if (file.indexOf(".js.map") > -1) {
									const sourceMapAsset = JSON.parse(assets[file].source());
									const sources = sourceMapAsset.sources || [];
									let changed = false;
									const modules = Array.from(compilation.modules);

									for (let index = 0; index < sources.length; index++) {
										const source = sources[index];
										const prefix = "webpack://webpack/data:text/js,";
										const webpackPrefix = "webpack://webpack/";
										if (source.indexOf(prefix) === 0) {
											const jsxSource = source.substring(webpackPrefix.length);

											const module = modules.find(
												m => m.resource === jsxSource
											);
											if (module) {
												const moduleId = chunkGraph.getModuleId(module);
												sources[index] = `${prefix}${moduleId}`;
												changed = true;
											}
										}

										if (/\.md$/.test(source)) {
											const mdSource = cachedAbsolutify(source.slice(webpackPrefix.length));
											const module = modules.find(m => m.resource === mdSource);
											if (module) {
												const moduleId = chunkGraph.getModuleId(module);
												sources[index] = `${prefix}${moduleId}`;
												changed = true;
											}
										}
									}

									if (changed) {
										assets[file] = new RawSource(
											JSON.stringify(sourceMapAsset)
										);
									}
								}
							}

							callback();
						}
					);
				}
			}
		});
	}
}

module.exports = JsxSourceMap;
