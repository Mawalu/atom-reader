/**
* User.js
*
* @description :: Store users and user passwords safe
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');
var randomstring = require('randomstring');

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
    feeds: {
      collection: 'feed',
      via: 'owner',
    }
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
      if (!theUser) return cb({'error': 'login failed'});
      bcrypt.compare(options.password, theUser.password, function(err, res) {
        delete theUser.password;
        delete theUser.registrationToken;

        if (res) return cb(null, theUser);
        return cb({'error': 'login failed'});
      });
    });
  },

  // Lifecycle callbacks
  beforeCreate: function (values, cb) {
    values.registrationToken = randomstring.generate();
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};
