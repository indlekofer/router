import assert from 'assert';

const requestAction = (xx, xxx) => [xx, xxx];
const dispatch = (fn) => fn;

import Router from '../src/index';

describe('Router', () => {
  let routes = [
    ['/', () => requestAction.bind(null, 'index')],
    ['/search/*', (v) => requestAction.bind(null, 'search', v)],
    ['/all/**', (v) => requestAction.bind(null, 'all', v)],
    ['/all2/**/all2/**', (v) => requestAction.bind(null, 'all2', v)],
    ['/**', (v) => requestAction.bind(null, 'any', v)]
  ];
  let r = new Router(routes);
  it('simple', () => {
    let rr = r.dispatch('/')(dispatch);
    assert.equal('index', rr[0]);
  });
  it('required arument', () => {
    let rr = r.dispatch('/search/arg1')(dispatch);
    assert.equal('search', rr[0]);
    assert.equal('arg1', rr[1][0]);
  });
  it('missing required arument', () => {
    let rr = r.dispatch('/search')(dispatch);
    assert.equal('any', rr[0]);
  });
  it('required aruments', () => {
    let rr = r.dispatch('/all/arg1/arg2')(dispatch);
    assert.equal('all', rr[0]);
    assert.equal('arg1', rr[1][0]);
    assert.equal('arg2', rr[1][1]);
  });
  it('multi required aruments', () => {
    let rr = r.dispatch('/all2/arg1/arg2/all2/arg3')(dispatch);
    assert.equal('all2', rr[0]);
    assert.equal('arg1', rr[1][0]);
    assert.equal('arg2', rr[1][1]);
    assert.equal('arg3', rr[1][2]);
  });
  it('multi required aruments fail check', () => {
    let rr = r.dispatch('/all2/all2/arg3')(dispatch);
    assert.equal('any', rr[0]);
  });

  describe('add', () => {
    let r = new Router();
    r.add('/', () => requestAction.bind(null, 'index'));
    r.add('/search/*', (v) => requestAction.bind(null, 'search', v));
    r.add('/all/**', (v) => requestAction.bind(null, 'all', v));
    r.add('/all2/**/all2/**', (v) => requestAction.bind(null, 'all2', v));
    r.add('/**', (v) => requestAction.bind(null, 'any', v));

    it('simple', () => {
      let rr = r.dispatch('/')(dispatch);
      assert.equal('index', rr[0]);
    });
    it('required arument', () => {
      let rr = r.dispatch('/search/arg1')(dispatch);
      assert.equal('search', rr[0]);
      assert.equal('arg1', rr[1][0]);
    });
    it('missing required arument', () => {
      let rr = r.dispatch('/search')(dispatch);
      assert.equal('any', rr[0]);
    });
  });
});
