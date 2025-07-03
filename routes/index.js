const routes = (app) => {
  app.use("/", homeRoute);
  app.use("/auth", authRoute);
  app.use("/records", recordRoute);
};

module.exports = routes;
