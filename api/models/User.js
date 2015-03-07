/**
* User.js
*
* @description :: Store users and user passwords safe
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 5
    },
    registrationToken: 'string',
  },

  /**
   * Search a user using an email and verify the password
   * @param {Object}    options
   *            => email {String} email of user
   * @param {Function}  cb
   */
  checkLogin: function (options, cb) {
    User.findOne({email: options.email}).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!Object.keys(theUser).length) return cb(new Error('User not found.'));
      bcrypt.compare(options.password, theUser.password, function(err, res) {
        delete theUser.password;

        if (res) return cb(null, theUser);
        return cb(new Error('Wrong password.'));
      });
    });
  },

  // Lifecycle callbacks
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 12, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};

