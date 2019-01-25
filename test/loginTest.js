const { renderLoginPage, isValidUser, loginHandler } = require('../src/login.js');
const { expect } = require('chai');

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

describe('loginHandler', () => {
  it('should return valid status code and redirction url', () => {
    let users = { get: () => [{ username: "abc", password: "abc" }] };
    let req = { body: "username=abc&password=abc" };
    let res = {
      setHeader: () => { },
      writeHead: (statusCode, redirectURL) => {
        expect(statusCode).to.equal(302);
        expect(redirectURL).has.property("Location").to.equal('/pages/todo.html');
      },
      write:()=>{},
      end:() => {}
    };
    loginHandler(users,req,res);
  });
});