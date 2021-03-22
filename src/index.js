import match from './match';

const router = function (routes) {
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
  return (dispatch) => {
    let c = this.routes.length, cb;
    for (let i = 0; i < c; i++) {
      let r = [];
      if (match(this.routes[i][0], pathname, r)) {
        cb = this.routes[i][1](r);
        return dispatch(cb());
      }
    }
  };
};

export {
  match
};
export default router;
