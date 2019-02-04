const { loginHandler } = require('../src/login.js');
const { expect } = require('chai');

describe('loginHandler', () => {
  it.skip('should return valid status code and redirction url', () => {
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