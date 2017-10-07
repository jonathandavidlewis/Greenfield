var MongoClient = require('mongodb').MongoClient;
var url = require('../config.js').dbUrl;
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../app.js');
var Users = require('../src/server/db/models/users.js');
var UserUtils = require('../src/server/db/utils/users-helpers.js');

// Adds support for assertions on array elements
// https://github.com/chaijs/Chai-Things#examples
//chai.use(require('chai-things'));

app.listen(app.get('port'));
console.log('Testing is listening on', app.get('port'));   //starts the app.

var testUsers = [
  {
    displayName: 'John Doe',
    email: 'johndoe@gmail.com',
    score: 0,
    token: "abc123",
    image: 'http://google.com/image.jpg',
    questionsAnswered: [],
    questionsAttempted: 0,
    questionsCorrect: 0
  },
  {
    displayName: 'Jane Doe',
    email: 'janedoe@gmail.com',
    score: 0,
    token: "abc1234",
    image: 'http://google.com/image.jpg',
    questionsAnswered: [],
    questionsAttempted: 0,
    questionsCorrect: 0
  },
  {
    displayName: 'Jason Doe',
    email: 'jasondoe@gmail.com',
    score: 0,
    token: "abc12345",
    image: 'http://google.com/image.jpg',
    questionsAnswered: [],
    questionsAttempted: 0,
    questionsCorrect: 0
  }
];

// Return a JSON object back from the response
// Handles both `res.send(JSON.stringify({}))` and `res.json({})`
var getBody = function (res) {
  return JSON.parse(res.text);
};
















describe('RESTful API', function () {

  beforeEach(function () {
    // Send a deep copy in so internal mutations do not affect our `testUsers` array above
    // Note: This copy technique works because we don't have any functions
    var usersCopy = JSON.parse(JSON.stringify(testUsers));
    usersCopy.forEach(function(testUser) {

      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log(err);
        } else {
          console.log('Connected to MongoDB server');
          UserUtils.signupUser(db, testUser, function() {
            //inserts user to table
            console.log('Signed Up new user with email:', testUser.email);
            db.close();
          });
        }
      });
    });
  });

  describe('/users', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

        request(app)
          .get('/users')
          .expect(200, done);

      });

    });

    describe('POST', function () {

      var newUser = {
        displayName: 'Jason Doe',
        email: 'jasondoe@gmail.com',
        score: 0,
        token: "abc12345",
        image: 'http://google.com/image.jpg',
        questionsAnswered: [],
        questionsAttempted: 0,
        questionsCorrect: 0
      };

      it('responds with a 201 (Created) when a valid user is sent', function (done) {

        request(app)
          .post('/users')
          .send(newUser)
          .expect(201, done);

      });

    });

  });

  describe('/users/update', function () {

    describe('PUT', function () {

      it('responds with a 200 (OK) when a user with a matching `email` exists', function (done) {

        request(app)
          .get('/api/users/1')
          .expect(200, done);

      });


    });

    describe('PUT', function () {

      it('responds with a 200 (OK) when a user with the matching `id` is updated', function (done) {

        request(app)
          .put('/users/1')
          .send({ name: 'Taka-san' })
          .expect(200, done);

      });

    });

    describe('DELETE', function () {

      it('responds with a 200 (OK) when a user with the matching `id` is deleted', function (done) {

        request(app)
          .delete('/api/users/1')
          .expect(200, done);

      });


    });

  });

});
