const { expect } = require('chai');
const { requestHandler } = require('../src/handler.js');
const { signupHandler } = require('../src/signup.js');

describe('requestHandler', () => {
  it('should return status code 200 if file exists', () => {
    let res = {
      location: undefined,
      end: function () { expect(this.statusCode).to.equal(200) },
      write: () => { }
    };
    let req = { url: '/' };
    requestHandler(req, res);
  });

  it('should return status code 404 if file not found', () => {
    let res = {
      statusCode: undefined,
      end: function () { expect(this.statusCode).to.equal(404) },
      write: () => { }
    };
    let req = { url: '/abc.html' };
    requestHandler(req, res);
  });
});

describe('signupHandler', () => {
  it('should return status code 200 if file exists', () => {
    let users = {
      add: () =>{ },
      get: () => []
    }
    let req = { body: "username=abc&password=xyx&displayName=a1" };
    let res = {
      statusCode: undefined,
      end: () => { },
      writeHead: function (statusCode, redirectURL) {
        expect(statusCode).to.equal(302);
        expect(redirectURL).has.property("Location").to.equal('/index.html');
      }
    };
    signupHandler(users, req, res);
  });
});
