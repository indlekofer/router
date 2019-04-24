"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "match", {
  enumerable: true,
  get: function get() {
    return _match["default"];
  }
});
exports["default"] = void 0;

var _match = _interopRequireDefault(require("./match"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = function router(routes) {
  if (typeof routes != 'undefined') {
    this.routes = routes;
  } else {
    this.routes = [];
  }
};

router.prototype.add = function (route, cb) {
  this.routes.push([route, cb]);
};

router.prototype.dispatch = function (pathname) {
  var _this = this;

  return function (dispatch) {
    var c = _this.routes.length,
        cb;

    for (var i = 0; i < c; i++) {
      var r = [];

      if ((0, _match["default"])(_this.routes[i][0], pathname, r)) {
        cb = _this.routes[i][1](r);
        return dispatch(cb());
      }
    }
  };
};

var _default = router;
exports["default"] = _default;