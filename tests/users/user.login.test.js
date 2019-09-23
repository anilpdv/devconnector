const request = require("supertest");
const app = require("../../server");
const Login_route = "/api/users/login";

const valid_input = {
  email: "pdvanil990@gmail.com",
  password: "4343jljflaf"
};

describe("Login Test cases", () => {
  // postive case
  it("should return 200 status and msg success", async done => {
    const res = await request(app)
      .post(Login_route)
      .send(valid_input)
      .expect(200);
    expect(res.body.token).toBeTruthy();
    done();
  });
  // negative case
  it("should return status 400 and errors length greater than 0", async done => {
    const invalid_input = {
      email: "",
      password: ""
    };
    const res = await request(app)
      .post(Login_route)
      .send(invalid_input)
      .expect(400);
    done();
  });

  // negative case
  it("should return status 400 and errors length should greater than 0", async done => {
    const invalid_input = {
      email: "pdvanil@gmail.com",
      passowrd: ""
    };

    const res = await request(app)
      .post(Login_route)
      .send(invalid_input)
      .expect(400);

    expect(res.body.errors.password).toMatch("Password is required");
    done();
  });

  // negative case
  it("should return status 400 and errors length should greater than 0", async done => {
    const invalid_input = {
      email: "",
      passowrd: "something"
    };

    const res = await request(app)
      .post(Login_route)
      .send(invalid_input)
      .expect(400);

    expect(res.body.errors.email).toMatch("Email is required");
    done();
  });

  // negative test case
  it("should return status 404 and message 'user not found'", async done => {
    const invalid_input = {
      email: "pdvanil@gmail.com",
      password: "anilpdv"
    };

    const res = await request(app)
      .post(Login_route)
      .send(invalid_input)
      .expect(404);
    expect(res.body.email).toMatch("User not found");
    done();
  });

  // negative test case
  it("should return 400 status and message password is incorrect", async done => {
    const invalid_input = {
      email: "pdvanil990@gmail.com",
      password: "4343jljfla"
    };
    const res = await request(app)
      .post(Login_route)
      .send(invalid_input)
      .expect(400);
    expect(res.body.password).toBeTruthy();
    expect(res.body.password).toMatch("password is incorrect");
    done();
  });
});

describe("protected route", () => {
  // positive case
  it("should return status 200 and user in req.body", async done => {
    const res = await request(app)
      .post(Login_route)
      .send(valid_input);
    const token = res.body.token;
    const protected_res = await request(app)
      .get("/api/users/current")
      .set("Authorization", token)
      .expect(200);
    done();
  });

  // negative case
  it("should return status 500 and messag of un authorized", async done => {
    const res = await request(app)
      .post(Login_route)
      .send(valid_input);
    const token = res.body.token;
    const protected_res = await request(app)
      .get("/api/users/current")
      .set("Authorization", token + "s")
      .expect(401);
    done();
  });
});
