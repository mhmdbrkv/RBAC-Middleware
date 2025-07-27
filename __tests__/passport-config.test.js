const initPassport = require("../config/passport-config");

describe("Passport Initialization Test", () => {
  let getUserByEmail, getUserById, mockPassport;

  beforeEach(() => {
    jest.clearAllMocks();
    getUserByEmail = jest.fn();
    getUserById = jest.fn();
    mockPassport = {
      use: jest.fn(),
      serializeUser: jest.fn(),
      deserializeUser: jest.fn(),
    };
  });

  it("should initialize passport", () => {
    initPassport(mockPassport, getUserByEmail, getUserById);
    expect(mockPassport.use).toHaveBeenCalled();
    expect(mockPassport.serializeUser).toHaveBeenCalled();
    expect(mockPassport.deserializeUser).toHaveBeenCalled();
  });
});
