//proxy
var client = __webpack_require__(
	/*! ../../../../webpack-main/hot/lazy-compilation-web.js?http%3A%2F%2Flocalhost%3A52965%2Flazy-compilation-using- */ "../../../../webpack-main/hot/lazy-compilation-web.js?http%3A%2F%2Flocalhost%3A52965%2Flazy-compilation-using-"
);
var data = "/Users/a/github/zstack/local-test/src/reactjs/index.js";
var resolveSelf, onError;
module.exports = new Promise(function (resolve, reject) {
	resolveSelf = resolve;
	onError = reject;
});
if (module.hot) {
	module.hot.accept();
	if (module.hot.data && module.hot.data.resolveSelf) {
		module.hot.data.resolveSelf(module.exports);
	}
	module.hot.dispose(function (data) {
		data.resolveSelf = resolveSelf;
		dispose(data);
	});
}
var dispose = client.keepAlive({
	data: data,
	active: false,
	module: module,
	onError: onError
});

// no proxy
var client = __webpack_require__(
	/*! ../../../../webpack-main/hot/lazy-compilation-web.js?http%3A%2F%2Flocalhost%3A54656%2Flazy-compilation-using- */ "../../../../webpack-main/hot/lazy-compilation-web.js?http%3A%2F%2Flocalhost%3A54656%2Flazy-compilation-using-"
);
var data = "/Users/a/github/zstack/local-test/src/reactjs/index.js";
module.exports = __webpack_require__
	.e(/*! import() */ "index_js")
	.then(
		__webpack_require__.bind(
			__webpack_require__,
			/*! ./index.js */ "./index.js"
		)
	);
if (module.hot) {
	module.hot.accept();
	module.hot.accept("./index.js", function () {
		module.hot.invalidate();
	});
	module.hot.dispose(function (data) {
		delete data.resolveSelf;
		dispose(data);
	});
	if (module.hot.data && module.hot.data.resolveSelf)
		module.hot.data.resolveSelf(module.exports);
}
function onError() {
	/* ignore */
}
var dispose = client.keepAlive({
	data: data,
	active: true,
	module: module,
	onError: onError
});
