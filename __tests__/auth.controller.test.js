const passport = require("passport");
const {
  getLogin,
  getRegister,
  register,
  login,
  logout,
} = require("../controllers/auth.controller");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("passport");

describe("Auth Controller: Register", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {
        name: "test",
        email: "test100",
        password: "test",
        role: "test",
      },
    };
    mockRes = {
      redirect: jest.fn(),
      render: jest.fn(),
    };
    mockNext = jest.fn();
  });

  const mockUsers = [
    {
      _id: 1,
      name: "test",
      email: "test",
      password: "test",
      role: "test",
    },
  ];

  it("should render register page", () => {
    expect(getRegister(mockReq, mockRes));
    expect(mockRes.render).toHaveBeenCalled();
    expect(mockRes.render).toHaveBeenCalledWith("register", { message: null });
    expect(mockRes.render).toHaveBeenCalledTimes(1);
  });

  it("should register user", async () => {
    expect(await register(mockReq, mockRes));

    expect(
      mockUsers.find((user) => user.email === mockReq.body.email)
    ).not.toEqual({
      _id: 1,
      name: "test",
      email: "test",
      password: "test",
      role: "test",
    });

    expect(mockUsers.push(mockReq.body)).toBeTruthy();

    // redirect tests
    expect(mockRes.redirect).toHaveBeenCalled();
    expect(mockRes.redirect).toHaveBeenCalledWith("/auth/login");
    expect(mockRes.redirect).toHaveBeenCalledTimes(1);
    expect(mockRes.redirect).not.toHaveBeenCalledWith("/auth/register");

    // render tests
    expect(mockRes.render).not.toHaveBeenCalled();
    expect(mockRes.render).not.toHaveBeenCalledTimes(1);
    expect(mockRes.render).not.toHaveBeenCalledWith("register", {
      message: "Email already exists",
    });
  });
});

describe("Auth Controller: Loging", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      redirect: jest.fn(),
      render: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should render login page", () => {
    expect(getLogin(mockReq, mockRes));
    expect(mockRes.render).toHaveBeenCalled();
    expect(mockRes.render).toHaveBeenCalledWith("login");
    expect(mockRes.render).toHaveBeenCalledTimes(1);
  });

  it("should call passport.authenticate with correct options", () => {
    // Prepare mock implementation
    const mockMiddleware = jest.fn();
    passport.authenticate.mockReturnValue(mockMiddleware);

    // Simulate calling the middleware
    login();

    expect(passport.authenticate).toHaveBeenCalledWith("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
    });
  });
});

describe("Auth Controller: Logout", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      logOut: jest.fn(),
    };
    mockRes = {
      redirect: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should log out user and redirect to login page", () => {
    mockReq.logOut.mockImplementation((cb) => cb(null)); // simulate no error

    logout(mockReq, mockRes, mockNext);

    expect(mockReq.logOut).toHaveBeenCalled();
    expect(mockRes.redirect).toHaveBeenCalledWith("/auth/login");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call next with error if logout fails", () => {
    const fakeError = new Error("Logout failed");
    mockReq.logOut.mockImplementation((cb) => cb(fakeError)); // simulate error

    logout(mockReq, mockRes, mockNext);

    expect(mockReq.logOut).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(fakeError);
    expect(mockRes.redirect).not.toHaveBeenCalled();
  });
});
