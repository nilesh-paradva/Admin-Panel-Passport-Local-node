const authMiddleware = (req, res, next) => ((req.isAuthenticated()) ? next() : res.redirect("/authsignin"));
const uthPageSecure = (req,res,next) => ((req.isAuthenticated()) ? res.redirect("/") : next());

module.exports = {authMiddleware, uthPageSecure};