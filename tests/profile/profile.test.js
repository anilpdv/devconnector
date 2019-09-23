const request = require("supertest");
const tokenGen = require("../helper/token.helper");

const app = require("../../server");
const valid_input = {
  email: "pdvanil990@gmail.com",
  password: "4343jljflaf"
};
// : changing defult jest timeout
jest.setTimeout(30000);

// : profile routes requests
describe("Profile Routes requests", () => {
  // negative case
  it("should return 400 status ", async done => {
    const invalid_input = {
      status: ""
    };
    const token = await tokenGen(valid_input.email, valid_input.password);

    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(invalid_input)
      .expect(400);
    console.log(res.body.errors);
    done();
  });
  // negative case
  it("should return 404 status", async done => {
    const token = await tokenGen(valid_input.email, valid_input.password);
    console.log("token", token);
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", token)
      .expect(404);
    done();
  });

  // negative case
  it("should return 404 and profile to exist", async done => {
    const res = await request(app)
      .get("/api/profile/handle/vi")
      .expect(404);
    expect(res.body.errors.noProfile).toBeTruthy();
    expect(res.body.errors.noProfile).toEqual("profile not found");
    done();
  });
});

describe("Profile /experience routes", () => {
  it("should return 400 ", async done => {
    const token = await tokenGen(valid_input.email, valid_input.password);
    const res = await request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send({ title: "" })
      .expect(400);
    done();
  });
});
