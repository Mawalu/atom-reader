/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true
    },
    password: 'string'
  },

  checkLogin: function (options, cb) {
    User.findOne(obtions.email).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      bcrypt.compare(options.password, theUser.password, function(err, res) {
        if (err) return cb(err);
        if (res) return cb(null, theUser.id);
        cb(new Error('Wrong password.'));
      });
    });
  },

  // Lifecycle Callbacks
  beforeCreation: function (values, cb) {
    bcrypt.hash(values.password, 12, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};

