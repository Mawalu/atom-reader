modules.export = function(req, res, next) {
    if (!req.session.authenticated) return res.send("Forbidden", 403);
    if (req.body) req.body.owner = req.session.user.id;
    req.query.owner = req.session.user.id;

    next();
}
