const { renderLoginPage, isValidUser, loginHandler } = require('../src/login.js');
const { expect } = require('chai');

describe('renderLoginPage', () => {
  it('should not redirect to todo.html if cookie is not present', () => {
    let req = { cookies: {}, body: "username=abc&password=abc" }
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

describe('loginHandler', () => {
  it('should return valid status code and redirction url', () => {
    const cachedData = {users:{},usersTodo:{}}
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
    loginHandler(cachedData,req,res);
  });
});