const slash = require("slash");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const WebpackError = require("../../lib/WebpackError");

class InconsistentVersionofDuplicateModuleWarning extends WebpackError {
	constructor(allDuplicateModules) {
		const warnings = Object.keys(allDuplicateModules)
			.map(moduleName => {
				const deps = allDuplicateModules[moduleName];
				const depMsg = deps
					.map((dep, index) => {
						return `${index + 1}: 路径:${dep.moduleDir} , 版本: ${dep.version}`;
					})
					.join("\n");
				const msg = `
${moduleName} 存在多个版本:
${depMsg}`;

				return msg;
			})
			.join("\n");

		super(`[InconsistentVersionofDuplicateModuleWarning] 存在重复版本:${warnings}`);
	}
}

class InconsistentVersionofDuplicateModulePlugin {
	constructor(options) {
		this.options = options || {};

		//@zstack/utils
		//node_modules/@zstack/utils/node_modules/@zstack/utils

		this.moduleNames = this.options ? this.options.moduleNames : [];
	}

	apply(compiler) {
		if (!this.moduleNames.length || compiler.options.mode !== "development") {
			return;
		}
		compiler.hooks.compilation.tap(
			"InconsistentVersionofDuplicateModulePlugin1",
			compilation => {
				compilation.hooks.afterOptimizeDependencies.tap(
					"InconsistentVersionofDuplicateModulePlugin2",
					modules => {
						const allModuleRequests = Array.from(modules || [])
							.map(md => md.userRequest)
							.filter(request => {
								if (!request) return false;
								const unixRequest = slash(request);

								return (
									unixRequest.indexOf("node_modules") > -1 &&
									this.moduleNames.some(
										moduleName => unixRequest.indexOf(moduleName) > -1
									)
								);
							});

						if (!allModuleRequests.length) {
							return;
						}

						const allModuleDirs = [];

						const moduleRegexNames = this.moduleNames.map(name => {
							return new RegExp(`${name}\/`, "g");
						});
						allModuleRequests.forEach(request => {
							const unixRequest = slash(request);

							moduleRegexNames.forEach((regex, index) => {
								let lastMatch = "";
								let lastIndex = -1;
								let match;
								while ((match = regex.exec(unixRequest)) !== null) {
									lastMatch = match;
									lastIndex = match.index;
								}

								if (lastMatch) {
									allModuleDirs.push(
										unixRequest.substring(
											0,
											lastIndex + this.moduleNames[index].length
										)
									);
								}
							});
						});

						const uniqueModuleDirs = _.uniq(allModuleDirs);

						if (!uniqueModuleDirs.length) {
							return;
						}
						const moduleVersionMap = {};
						const moduleVersionNamesRegex = this.moduleNames.map(name => {
							return new RegExp(`${name}$`);
						});

						uniqueModuleDirs.forEach(moduleDir => {
							const packagePath = path.join(moduleDir, "package.json");
							if (fs.existsSync(packagePath)) {
								const version = require(packagePath).version;

								if (version) {
									for (let i = 0; i < moduleVersionNamesRegex.length; i++) {
										const regex = moduleVersionNamesRegex[i];

										if (regex.test(moduleDir)) {
											const moduleName = this.moduleNames[i];
											if (!moduleVersionMap[moduleName]) {
												moduleVersionMap[moduleName] = [];
											}
											moduleVersionMap[moduleName].push({
												version,
												moduleDir
											});
											break;
										}
									}
								}
							}
						});

						const allDuplicateModules = {};
						let hasDuplicates = false;
						Object.keys(moduleVersionMap).forEach(moduleName => {
							const deps = moduleVersionMap[moduleName];

							if (deps.length > 1) {
								allDuplicateModules[moduleName] = deps;
								hasDuplicates = true;
							}
						});

						if (hasDuplicates) {
							compilation.warnings.push(
								new InconsistentVersionofDuplicateModuleWarning(
									allDuplicateModules
								)
							);
						}
					}
				);
			}
		);
	}
}

module.exports = InconsistentVersionofDuplicateModulePlugin;
