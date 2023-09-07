"use strict";
(self["webpackChunkreact_streaming_ssr_demo"] = self["webpackChunkreact_streaming_ssr_demo"] || []).push([["src_Content_js"],{

/***/ "./src/Content.js":
/*!************************!*\
  !*** ./src/Content.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Content)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/sandbox/src/Content.js";

var data;
var getData = function getData() {
  if (!data) {
    data = new Promise(function (resolve) {
      setTimeout(function () {
        data = "content from remote";
        resolve();
      }, 2000);
    });
    throw data;
  }

  // promise-like
  if (data && data.then) {
    throw data;
  }
  var result = data;
  data = undefined;
  return result;
};
function Content() {
  var data = getData();
  // const data = 'local content'
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: data
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 10
  }, this);
}

/***/ })

}]);
//# sourceMappingURL=src_Content_js.main.js.map