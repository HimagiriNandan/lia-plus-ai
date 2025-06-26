function roleMiddleware () {
  return (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not admin" });
    }
    next();
  };
};

module.exports = roleMiddleware;