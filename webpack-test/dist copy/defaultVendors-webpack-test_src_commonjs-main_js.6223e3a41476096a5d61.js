/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([["defaultVendors-webpack-test_src_commonjs-main_js"],{

/***/ "./webpack-test/src/commonjs-main.js":
/*!*******************************************!*\
  !*** ./webpack-test/src/commonjs-main.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const common1_fun1 = __webpack_require__(/*! ./commonjs/common1 */ \"./webpack-test/src/commonjs/common1.js\");\nconst { common2_fun1 } = __webpack_require__(/*! ./commonjs/common2 */ \"./webpack-test/src/commonjs/common2.js\");\n\ncommon1_fun1();\ncommon2_fun1();\n\n\n//# sourceURL=webpack://webpack/./webpack-test/src/commonjs-main.js?");

/***/ }),

/***/ "./webpack-test/src/commonjs/common1.js":
/*!*******
hu	***************************************!*\
  !*** ./webpack-test/src/commonjs/common1.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\nfunction common1_fun1() {}\n\nmodule.exports = common1_fun1;\n\n\n//# sourceURL=webpack://webpack/./webpack-test/src/commonjs/common1.js?");

/***/ }),

/***/ "./webpack-test/src/commonjs/common2.js":
/*!**********************************************!*\
  !*** ./webpack-test/src/commonjs/common2.js ***!
  \**********************************************/
/***/ ((module) => {

eval("function common2_fun1() {}\n\nconst common2_const = 12;\nmodule.exports = {\n\tcommon2_fun1,\n\tcommon2_const\n};\n\n\n//# sourceURL=webpack://webpack/./webpack-test/src/commonjs/common2.js?");

/***/ })

}]);
