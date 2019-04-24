import assert from 'assert';


import match from '../src/match';

describe('match', () => {
  it('search ??', () => {
    let r = [];
    assert.equal(true, match('/a/??', '/a/b/c', r));
    assert.equal(r[0], 'b');
    assert.equal(r[1], 'c');
  });
  it('search ?? optional', () => {
    let r = [];
    assert.equal(true, match('/a/??', '/a', r));
    assert.equal(r.length, 0);
  });
  it('search ?? optional', () => {
    let r = [];
    assert.equal(false, match('/a/??/a', '/a/a/a', r));
    assert.equal(r.length, 0);
  });
  it('search ?? multi', () => {
    let r = [];
    assert.equal(true, match('/a/??/a/??/a', '/a/b/a/b/a', r));
    assert.equal(r[0], 'b');
    assert.equal(r[1], 'b');
  });
  it('search ?? optional', () => {
    let r = [];
    assert.equal(true, match('/a/??/b', '/a/a/a/b', r));
  });
  it('search ?', () => {
    let r = [];
    assert.equal(true, match('/a/?/c', '/a/b/c', r));
    assert.equal(r[0], 'b');
  });
  it('search ? optional', () => {
    let r = [];
    assert.equal(true, match('/a/?/c', '/a/c', r));
    assert.equal(r.length, 0);
  });
  it('search ?', () => {
    let r = [];
    assert.equal(false, match('/a/?/c', '/a/c/c', r));
  });
  it('search ?', () => {
    let r = [];
    assert.equal(true, match('/a/?/a/?/a', '/a/b/a/b/a', r));
    assert.equal(r[0], 'b');
    assert.equal(r[1], 'b');
  });
  it('search ?', () => {
    let r = [];
    assert.equal(true, match('/a/?', '/a/c', r));
  });
});
