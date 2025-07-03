const getHome = async (req, res, next) => {
  res.render("/");
};

module.exports = { getHome };
