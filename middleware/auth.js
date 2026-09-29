function requireUser(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Sign in to continue."
    });
  }

  next();
}

module.exports = {
  requireUser
};