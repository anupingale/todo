const { User, Users } = require('../src/model/user.js');
const { expect } = require('chai');

describe('Adding user to Users Class', () => {
  it('should set the userDetails from an array', () => {
    const user = new User('ABC', 'a1', 'xyz');
    const users = new Users();
    users.set([user]);
    let userDetails = users.get()[0];
    expect(userDetails).has.property('displayName').to.equal('ABC');
    expect(userDetails).has.property('username').to.equal('a1');
    expect(userDetails).has.property('password').to.equal('xyz');
  });

  it('should add userDetails from User Object', () => {
    const user = new User('ABC', 'a1', 'xyz');
    const users = new Users();
    users.add(user);
    let userDetails = users.get()[0];
    expect(userDetails).has.property('displayName').to.equal('ABC');
    expect(userDetails).has.property('username').to.equal('a1');
    expect(userDetails).has.property('password').to.equal('xyz');
  });
});
