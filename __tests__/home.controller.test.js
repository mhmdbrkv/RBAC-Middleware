const { getHome } = require("../controllers/home.controller");

describe("Home Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = { render: jest.fn() };
  });

  it("should render the home page", () => {
    getHome(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalled();
    expect(mockRes.render).toHaveBeenCalledWith("index");
    expect(mockRes.render).toHaveBeenCalledTimes(1);
  });
});
