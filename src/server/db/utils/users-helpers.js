
//Insert user data if it doesn't exist
var signupUser = function(db, user, callback) {
  //Specify the collection where we will 'insert' in this case 'users'
  var collection = db.collection('test-users');

  collection.insert(user, function(err, result) {

    console.log('Signed up a user', user, 'into Mongo collection');
    callback(result);
  });
}

//Check if user exists
var findUser = function(db, email, success, failure) {
  //Specify the collection where we will 'find' in this case 'users'

  var collection = db.collection('test-users');
    //Find question, empty should return all
    collection.find({ email: email }, function(err, user) {
      if (user) {
        success(user);
      } else {
        failure(user);
      }
    })

}

//Update user's score
var updateUserScore = function (db, user, points, callback) {

    var collection = db.collection('test-users');

    collection.findOneAndUpdate(
    { _id: user._id },
    { $inc: { "score" : points } } //adds number of points to user's score
    )
}

module.exports = {
  signupUser: signupUser,
  findUser: findUser,
  updateUserScore: updateUserScore
}
