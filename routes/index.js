const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const recordRoute = require("./record.route");

const routes = (app) => {
  app.use("/", homeRoute);
  app.use("/auth", authRoute);
  app.use("/records", recordRoute);
};

module.exports = routes;
