const { records } = require("../config/records.json");

const {
  getRecords,
  getOneRecord,
} = require("../controllers/record.controller");

describe("Record Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        id: 1,
      },
    };
    mockRes = { render: jest.fn() };
  });

  it("should render the records page with all records", () => {
    getRecords(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalled();
    expect(mockRes.render).toHaveBeenCalledWith("records", {
      records: records || [],
      singleRecord: null,
    });
    expect(mockRes.render).toHaveBeenCalledTimes(1);
  });

  it("should render the records page with one record", () => {
    let mockRecord = { _id: 1, name: "Record 1" };

    getOneRecord(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalled();
    expect(mockRes.render).toHaveBeenCalledWith("records", {
      records: [],
      singleRecord: mockRecord || null,
    });
    expect(mockRes.render).toHaveBeenCalledTimes(1);
  });
});
