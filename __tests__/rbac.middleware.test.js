const { roles } = require("../config/roles.json");
const { checkPermissions } = require("../middleware/rbac.middleware");

describe("RBAC Middleware", () => {
  let mockReq, mockRes, mockNext;
  beforeEach(() => {
    mockReq = {
      user: { role: "admin" },
    };
    mockRes = { status: jest.fn(), render: jest.fn() };
    mockNext = jest.fn();
  });

  it("should check if user has permission", () => {
    checkPermissions("create_record")(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.render).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});
