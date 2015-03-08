/**
 * FeedController
 *
 * @description :: Server-side logic for managing feeds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  my: function (req, res) {
    return Feed.find({owner: req.session.user.id}).exec(function (err, feeds) {
        if (err) return res.serverError(err);
        return res.json(feeds);
    });
  }    
};

