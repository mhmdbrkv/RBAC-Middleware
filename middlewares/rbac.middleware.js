const { roles } = require("../config/roles.json");

const checkRole = (roleName) => (req, res, next) => {
  const { role } = req.body;
  if (!role === roleName)
    return res.status(403).json({
      status: "fail",
      message: "Not Authorized to perfom this action",
    });

  next();
};

const checkPermissions =
  (...permissions) =>
  (req, res, next) => {
    const { role } = req.body;
    let rolePermissions;
    roles.forEach((r) => {
      if (r.name === role) {
        rolePermissions = r.permissions;
      }
    });

    if (!rolePermissions in permissions) {
      return res.status(403).json({
        status: "fail",
        message: "Not Authorized to perfom this action",
      });
    }
    next();
  };

module.exports = {
  checkRole,
  checkPermissions,
};
