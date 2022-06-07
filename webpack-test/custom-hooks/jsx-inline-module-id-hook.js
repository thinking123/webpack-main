class JsxInlineModuleId {
	constructor(options = {}) {
		this.disabled = !!options.disabled;
	}

	apply(compiler) {
		// return
		if (this.disabled) {
			return;
		}
		compiler.hooks.compilation.tap("moduleids", (compilation, params) => {
			compilation.hooks.moduleIds.tap(
				{
					name: "moduleids",
					stage: 100
				},
				modules => {
					const isDeveopment =
						compilation.compiler.options.mode === "development";
					if (isDeveopment) {
					}
					const chunkGraph = compilation.chunkGraph;

					modules.forEach(m => {
						if (!m.request) return;

						if (m.request.indexOf("data:text/js") > -1) {
							const issuer = compilation.moduleGraph.getIssuer(m);
							if (issuer) {
								// const outgoingConnections = compilation.moduleGraph.getOutgoingConnections(issuer)
								let index = 0;
								for (const connection of compilation.moduleGraph.getOutgoingConnections(
									issuer
								)) {
									if (
										connection &&
										connection.dependency &&
										connection.dependency.request.indexOf("data:text/js") >
											-1 &&
										connection.dependency.constructor.name ===
											"HarmonyImportSpecifierDependency"
									) {
										if (connection.module === m) {
											const issuerId = chunkGraph.getModuleId(issuer);
											const newId = `${issuerId.replace(
												".js",
												`-inline-jsx-index-${index}.js`
											)}`;
											chunkGraph.setModuleId(m, newId);
										} else {
											index++;
										}
									}
								}
							}
						}

						if (m.request.indexOf(".md") > -1) {
							let moduleId = chunkGraph.getModuleId(m);

							moduleId = moduleId.replace(/\.md$/, "-md.js");

							chunkGraph.setModuleId(m, moduleId);
						}
					});
				}
			);
		});
	}
}

module.exports = JsxInlineModuleId;
