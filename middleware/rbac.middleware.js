const { roles } = require("../config/roles.json");

const checkPermissions = (permission) => (req, res, next) => {
  if (!req.user) {
    return res.status(403).render("notAuthorized", {
      message: "Not Authorized to perfom this action",
    });
  }
  const { role } = req.user;
  let roleFound = roles.find((r) => r.name === role);

  if (!roleFound) {
    return res.status(403).render("notAuthorized", {
      message: "Not Authorized to perfom this action",
    });
  }

  if (!roleFound.permissions.includes(permission)) {
    return res.status(403).render("notAuthorized", {
      message: "Not Authorized to perfom this action",
    });
  }
  next();
};

module.exports = {
  checkPermissions,
};
