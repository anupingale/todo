const { parseUserInput } = require('../src/signup.js');
const { expect } = require('chai');
describe('parseUserInput', () => {
  it('should parse the userDetail in key value pair', () => {
    let result = parseUserInput("username=abc&password=xyz")
    expect(result).has.property("username").to.equal("abc");
    expect(result).has.property("password").to.equal("xyz");
  });
});