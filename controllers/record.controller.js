const { records } = require("../config/records.json");

const getRecords = async (req, res, next) => {
  res.render("/", { records });
};
const getOneRecord = async (req, res, next) => {
  const { id } = req.params;
  let record;
  records.forEach((r) => {
    if (r._id === id) {
      record = r;
    }
  });
  res.render("/", { singleRecord: record });
};

module.exports = {
  getRecords,
  getOneRecord,
};
