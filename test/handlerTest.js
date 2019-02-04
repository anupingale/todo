const { expect } = require('chai');
const { requestHandler } = require('../src/handler.js');
const { signupHandler } = require('../src/signup.js');

describe('requestHandler', () => {
  it.skip('should return status code 404 if file not found', () => {
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
  it.skip('should return status code 200 if file exists', () => {
    const cachedData = {users:{"abc":{"displayName":"a1","password":"abc"}},usersTodo:{}}    
    let req = { body: "username=abc&password=xyx&displayName=a1" };
    let res = {
      statusCode: undefined,
      redirectURL: undefined,
      end: function () {
        expect(this.statusCode).to.equal(302);
      },
      writeHead: function () { },

      setHeader: function (location, url) { expect(url).to.equal('/pages/signup.html'); }
    };
    signupHandler(cachedData,req, res);
  });
});
