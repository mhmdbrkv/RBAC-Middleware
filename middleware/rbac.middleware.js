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
    if (!req.user) {
      return res.status(403).render("notAuthorized", {
        message: "Not Authorized to perfom this action",
      });
    }
    const { role } = req.user;
    let rolePermissions;
    roles.forEach((r) => {
      if (r.name === role) {
        rolePermissions = r.permissions;
      }
    });

    const rolePermissionsSet = new Set(rolePermissions);
    const allExist = permissions.every((item) => rolePermissionsSet.has(item));

    if (!allExist) {
      return res.status(403).render("notAuthorized", {
        message: "Not Authorized to perfom this action",
      });
    }
    next();
  };

module.exports = {
  checkRole,
  checkPermissions,
};
