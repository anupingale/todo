const { isEqual } = require('../src/util.js');
const { expect } = require('chai');

describe('isEqual', () => {
  it('should return true if values are equal', () => {
    let result = isEqual(1, 1);
    expect(result).to.equal(true);
    result = isEqual('Hi', 'Hi');
    expect(result).to.equal(true);
  });

  it('should return false if values are not equal', () => {
    let result = isEqual(1, 0);
    expect(result).to.equal(false);
    result = isEqual('Hi', 'Hello');
    expect(result).to.equal(false);
  });
});
