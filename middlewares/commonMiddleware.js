const User = require('../models/User')


exports.AdminMiddleware = async(req, res, next) => {
    const userDetails = await User.findById(req.user.id)

    if (userDetails.isAdmin == false) {
      return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
  };