const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/auth.middleware");

describe("Auth Middleware", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { isAuthenticated: jest.fn() };
    mockRes = { redirect: jest.fn() };
    mockNext = jest.fn();
  });

  it("should check if user is authenticated", () => {
    checkAuthenticated(mockReq, mockRes, mockNext);
    expect(mockRes.redirect).toHaveBeenCalled();
    expect(mockRes.redirect).toHaveBeenCalledWith("/auth/login");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should check if user is not authenticated", () => {
    checkNotAuthenticated(mockReq, mockRes, mockNext);
    expect(mockRes.redirect).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
