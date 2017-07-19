var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

//user schema
var UserSchema = mongoose.Schema({
	name : {
		type: String
	},
	email : {
		type: String,
		require : true
	},
	username : {
		type: String,
		require : true
	},
	password : {
		type: String,
		require : true
	}
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
