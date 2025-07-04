const getHome = async (req, res, next) => {
  res.render("index");
};

module.exports = { getHome };
