const roles = require("../config/roles.json");

class Role {
  constructor() {
    this.roles = roles.roles;
  }

  getRoles() {
    return this.roles;
  }

  getRoleByName(name) {
    return this.roles.find((role) => role.name === name);
  }
}

module.exports = Role;
