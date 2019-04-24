"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * string search
 * string path
 * array r - will mutate the array with patterns found
 *
 * ** matches any but one is required
 * * matches one
 * ?? matches any optional
 * ? optional match
 **/
var _default = function _default(search, path, r) {
  if (search.substr(search.length - 1) === '/') search = search.toLowerCase().substr(0, search.length - 1);
  if (path.substr(path.length - 1) === '/') path = path.toLowerCase().substr(0, path.length - 1); //quick exit if search is path

  if (search === path) {
    return true;
  } //so:
  // -- /xx/**/yy/zz/**
  // -> /xx/aa/bb/yy/zz/cc/dd


  var pathData = path.split('/'),
      searchData = search.split('/'),
      pathDataLength = pathData.length,
      searchDataLength = searchData.length,
      c = pathDataLength > searchDataLength ? pathDataLength : searchDataLength,
      oo = false,
      aa = false,
      match = false; //iterate over the length of either pathDataLength or searchDataLength

  for (var i = 1, so = 1; i < c; i++, so++) {
    if (typeof pathData[i] == 'undefined') {
      if (match !== false) {
        return false;
      } else if (typeof searchData[so] == 'undefined') {
        return true;
      } else if (aa === false && oo === false && searchData[so] != '?' && searchData[so] != '??') {
        return false;
      } else {
        return true;
      }
    } else if (typeof searchData[so] == 'undefined') {
      //check for previous aa
      if (aa) {
        r.push(pathData[i]);
      } else if (oo) {
        r.push(pathData[i]);
      } else {
        return false;
      }
    } else if (aa && match !== false) {
      if (pathData[i] === match) {
        aa = false;
        match = false;
      } else {
        r.push(pathData[i]);
      }
    } else if (searchData[so] === '*') {
      r.push(pathData[i]);
    } else if (searchData[so] === '**') {
      aa = true;

      if (typeof searchData[so + 1] !== 'undefined') {
        match = searchData[so + 1];
        so--;
      }

      r.push(pathData[i]);
    } else if (searchData[so] === '?') {
      //first check after current
      if (typeof searchData[so + 1] == 'undefined') r.push(pathData[i]);else if (searchData[so + 1] !== pathData[i]) r.push(pathData[i]);else {
        i--;
      }
    } else if (searchData[so] === '??') {
      if (typeof searchData[so + 1] == 'undefined') {
        oo = true;
        r.push(pathData[i]);
      } else if (searchData[so + 1] !== pathData[i]) {
        oo = true;
        match = searchData[so + 1];
        so--;
        r.push(pathData[i]);
      } else {
        i--;
      }
    } else if (searchData[so] !== pathData[i]) {
      return false;
    }
  }

  return match === false || oo;
};

exports["default"] = _default;