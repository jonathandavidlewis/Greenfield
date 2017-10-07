var chai = require('chai');
var expect = chai.expect;
var Users = require('../src/server/db/models/users.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
chai.use(require('chai-things'));


describe('Users Model', function () {
  var testUsers;

  beforeEach(function () {
    testUsers = [
      {
        _id: 1,
        name: 'Taka',
        email: 'taka@taka.com'
      },
      {
        _id: 2,
        name: 'Nayo',
        email: 'nayo@nayo.com'
      },
      {
        _id: 3,
        name: 'Amrit',
        email: 'amrit@amrit.com'
      }
    ];

    Users.setAll(testUsers);
  });
});
