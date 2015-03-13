/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {
  register: function (req, res) {
    var values = req.allParams();
    User.create(values, function(err, model) {
      if (err) return res.json(err);
      delete model.registrationToken;
      delete model.password;
      return res.json(model);
    });
  },
  login: function (req, res) {
    User.checkLogin(req.allParams(), function(err, model) {
      if (err) return res.json(err);
      req.session.user = model;
      req.session.authenticated = true;
      return res.json(model);
    });
  },
  secure: function (req, res) {
    res.send("protected site");
  }    
};

