const { parseUserInput, renderLoginPage, isValidUser } = require('../src/signup.js');
const { expect } = require('chai');

describe('parseUserInput', () => {
  it('should parse the userDetail in key value pair', () => {
    const result = parseUserInput("username=abc&password=xyz")
    expect(result).has.property("username").to.equal("abc");
    expect(result).has.property("password").to.equal("xyz");
  });
});

describe('renderLoginPage', () => {
  it('should redirect to todo.html if cookie is present', () => {
    let req = { cookies: { username: "abc" } }
    const next = () => { }
    let res = {
      end: () => { },
      writeHead: function (statusCode, rediectionURL) {
        expect(statusCode).to.equal(302);
        expect(rediectionURL).has.property("Location").to.equal('/pages/todo.html');
      }
    }
    renderLoginPage(req, res, next);
  });

  it('should not redirect to todo.html if cookie is not present', () => {
    let req = { cookies: {} }
    const next = () => {
      expect(res.statusCode).to.not.equal(302);
    }
    let res = {
      statusCode: undefined,
      end: () => { },
      writeHead: function (statusCode, rediectionURL) { }
    }
    renderLoginPage(req, res, next);
  });
});

describe('isValidUser', () => {
  const users = [{ username: 'abc', password: 'abc' }];
  it('should return true if the user details are present', () => {
    const loginDetails = { username: 'abc', password: 'abc' };
    expect(isValidUser(users, loginDetails)).to.equal(true);
  });

  it('should return false if the user details are not present', () => {
    const loginDetails = { username: 'a', password: 'a' };
    expect(isValidUser(users, loginDetails)).to.equal(false);
  });
});