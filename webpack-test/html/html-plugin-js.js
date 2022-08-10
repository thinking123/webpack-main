
// html plugin 导出 HTML_WEBPACK_PLUGIN_RESULT

var HTML_WEBPACK_PLUGIN_RESULT;
(() => {
	// webpackBootstrap
	var __webpack_modules__ = {
		/***/ "./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs":
			/*!*************************************************************************************************************!*\
  !*** ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs ***!
  \*************************************************************************************************************/
			/***/ module => {
				eval(
					"var _ = require(\"/Users/a/github/webpack-main/node_modules/lodash/lodash.js\");module.exports = function (templateParams) { with(templateParams) {return (function(data) {\nvar __t, __p = '';\n__p += '<!DOCTYPE html>\\n<html>\\n  <head>\\n    <meta charset=\"utf-8\">\\n    <title>' +\n((__t = ( htmlWebpackPlugin.options.title )) == null ? '' : __t) +\n'</title>\\n  </head>\\n  <body>\\n  </body>\\n</html>';\nreturn __p\n})();}}\n\n//# sourceURL=webpack://webpack/./node_modules/html-webpack-plugin/default_index.ejs?./node_modules/html-webpack-plugin/lib/loader.js"
				);

				/***/
			},

		/***/ "data:text/javascript,__webpack_public_path__ = __webpack_base_uri__ = htmlWebpackPluginPublicPath;":
			/*!**********************************************************************************************************!*\
  !*** data:text/javascript,__webpack_public_path__ = __webpack_base_uri__ = htmlWebpackPluginPublicPath; ***!
  \**********************************************************************************************************/
			/***/ (
				__unused_webpack_module,
				__unused_webpack_exports,
				__webpack_require__
			) => {
				eval(
					"__webpack_require__.p = __webpack_require__.b = htmlWebpackPluginPublicPath;\n\n//# sourceURL=webpack://webpack/data:text/javascript,__webpack_public_path___=___webpack_base_uri___=_htmlWebpackPluginPublicPath;?"
				);

				/***/
			}
	};
	/************************************************************************/
	// The module cache
	var __webpack_module_cache__ = {};

	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		var cachedModule = __webpack_module_cache__[moduleId];
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		// Create a new module (and put it into the cache)
		var module = (__webpack_module_cache__[moduleId] = {
			// no module.id needed
			// no module.loaded needed
			exports: {}
		});

		// Execute the module function
		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

		// Return the exports of the module
		return module.exports;
	}

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = __webpack_modules__;

	/************************************************************************/
	/* webpack/runtime/hasOwnProperty shorthand */
	(() => {
		__webpack_require__.o = (obj, prop) =>
			Object.prototype.hasOwnProperty.call(obj, prop);
	})();

	/* webpack/runtime/publicPath */
	(() => {
		__webpack_require__.p = "";
	})();

	/* webpack/runtime/require chunk loading */
	(() => {
		__webpack_require__.b = require("url").pathToFileURL(__filename);

		// object to store loaded chunks
		// "1" means "loaded", otherwise not loaded yet
		var installedChunks = {
			"HtmlWebpackPlugin_0-0": 1
		};

		// no on chunks loaded

		// no chunk install function needed

		// no chunk loading

		// no external install chunk

		// no HMR

		// no HMR manifest
	})();

	/************************************************************************/

	// startup
	// Load entry module and return exports
	// This entry module can't be inlined because the eval devtool is used.
	__webpack_require__(
		"data:text/javascript,__webpack_public_path__ = __webpack_base_uri__ = htmlWebpackPluginPublicPath;"
	);
	var __webpack_exports__ = __webpack_require__(
		"./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs"
	);
	HTML_WEBPACK_PLUGIN_RESULT = __webpack_exports__;
})();
