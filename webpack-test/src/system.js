function autoPublicPath(rootDirLevel) {
  if (!rootDirLevel) {
    rootDirLevel = 1;
  }

  if (typeof __webpack_public_path__ !== "undefined") {
    if (typeof __system_context__ === "undefined") {
      throw Error(
        "systemjs-webpack-interop requires webpack@>=5.0.0-beta.15 and output.libraryTarget set to 'system'"
      );
    }

    if (!__system_context__.meta || !__system_context__.meta.url) {
      console.error("__system_context__", __system_context__);
      throw Error(
        "systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided"
      );
    }

    __webpack_public_path__ = resolveDirectory(
      __system_context__.meta.url,
      rootDirLevel
    );
  }
};


function resolveDirectory(urlString, rootDirectoryLevel) {
  // Our friend IE11 doesn't support new URL()
  // https://github.com/single-spa/single-spa/issues/612
  // https://gist.github.com/jlong/2428561

  var a = document.createElement("a");
  a.href = urlString;

  var pathname = a.pathname[0] === "/" ? a.pathname : "/" + a.pathname;
  var numDirsProcessed = 0,
    index = pathname.length;
  while (numDirsProcessed !== rootDirectoryLevel && index >= 0) {
    var char = pathname[--index];
    if (char === "/") {
      numDirsProcessed++;
    }
  }

  if (numDirsProcessed !== rootDirectoryLevel) {
    throw Error(
      "systemjs-webpack-interop: rootDirectoryLevel (" +
        rootDirectoryLevel +
        ") is greater than the number of directories (" +
        numDirsProcessed +
        ") in the URL path " +
        urlString
    );
  }

  var finalPath = pathname.slice(0, index + 1);

  return a.protocol + "//" + a.host + finalPath;
}


autoPublicPath(1)
