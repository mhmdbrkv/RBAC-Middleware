const { records } = require("../config/records.json");

const getRecords = async (req, res, next) => {
  res.render("records", {
    records: records || [],
    singleRecord: null,
  });
};

const getOneRecord = async (req, res, next) => {
  const { id } = req.params;

  let index = records.findIndex((r) => r._id.toString() === id.toString());

  res.render("records", {
    records: [],
    singleRecord: records[index] || null,
  });
};

module.exports = {
  getRecords,
  getOneRecord,
};
