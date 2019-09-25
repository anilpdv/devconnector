const request = require("supertest");
const app = require("../../server");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Posts = require("../../models/Posts");

const Register_route = "/api/users/register";

// : User Register Test Case
describe("User Registration", () => {
  // clearing database
  beforeAll(async done => {
    try {
      const res = await User.find({}).deleteMany();
      const profile_res = await Profile.find({}).deleteMany();
      const posts = await Posts.find({}).deleteMany();
      console.log("user removed");
      console.log("profile removed");
      done();
    } catch (err) {
      console.log(err);
    }
  });

  // postive test case
  it("should return 201 status with user in it", async done => {
    const valid_input = {
      email: "pdvanil980@gmail.com",
      name: "anilpdv",
      password: "4343jljflaf"
    };

    const res = await request(app)
      .post(Register_route)
      .send(valid_input)
      .expect(201);

    expect(res.body.user).toBeTruthy();
    done();
  });

  // negative test case
  it("should return 400 and message user already exists", async done => {
    const invalid_input = {
      email: "pdvanil980@gmail.com",
      name: "anilpdv",
      password: "4343jljflaf"
    };

    const res = await request(app)
      .post(Register_route)
      .send(invalid_input)
      .expect(400);

    expect(res.body.errors[0].msg).toMatch("User already Exists");
    done();
  });

  // negative test case
  it("should return 400 status message with name required", async done => {
    const invalid_input = {
      email: "pdvanil980@gmail.com",
      name: "",
      password: "434jflajfj"
    };

    const res = await request(app)
      .post(Register_route)
      .send(invalid_input)
      .expect(400);
    expect(res.body.errors[0].msg).toMatch("name is required");
    done();
  });

  // negative case
  it("should return 400 status message with email required", async done => {
    const invalid_input = {
      email: "pdvanilgmail.com",
      name: "anilpdv",
      password: "434jflajfj"
    };

    const res = await request(app)
      .post(Register_route)
      .send(invalid_input)
      .expect(400);
    expect(res.body.errors[0].msg).toMatch("please enter valid email");
    done();
  });

  // negative case
  it("should return 400 status message with password required", async done => {
    const invalid_input = {
      email: "pdvanil@gmail.com",
      name: "anilpdv",
      password: ""
    };

    const res = await request(app)
      .post(Register_route)
      .send(invalid_input)
      .expect(400);
    expect(res.body.errors[0].msg).toMatch(
      "password must be 6 or more characters"
    );
    done();
  });

  // negative case
  it("should return 400 status message with errors length greater than 1", async done => {
    const invalid_input = {
      email: "",
      name: "",
      password: ""
    };

    const res = await request(app)
      .post(Register_route)
      .send(invalid_input)
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(1);
    done();
  });

  afterAll(async done => {
    done();
  });
});
