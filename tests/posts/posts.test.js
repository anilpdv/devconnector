const request = require("supertest");
const app = require("../../server");
const tokenGen = require("../helper/token.helper");

jest.setTimeout(30000);
describe("Posts Routes", () => {
  // postive case
  it("should return 200 status", async done => {
    const res = await request(app)
      .get("/api/posts")
      .expect(200);
    done();
  });

  // postive case
  it("should return status 200 ", async done => {
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    console.log(post_id);
    const post_res = await request(app)
      .get("/api/posts/" + post_id)
      .expect(200);
    done();
  });

  // negative case
  it("should return status 404 ", async done => {
    const res = await request(app)
      .get("/api/posts/" + "sejfaklfjl")
      .expect(404);
    done();
  });
});

describe("Posts post route /api/posts", () => {
  // postive case
  it("should return 200 status and post in response", async done => {
    const valid_input = {
      text:
        "its symbolic nature in the woods, skeptically waking up to see the northen winds."
    };
    const token = await tokenGen();
    const res = request(app)
      .post(valid_input)
      .expect(200);
    done();
  });
  // negative case
  it("should return 400 status", async done => {
    const invalid_input = {
      text: ""
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", token)
      .send(invalid_input)
      .expect(400);
    done();
  });

  // negative case
  it("should return 400 status", async done => {
    const invalid_input = {
      text: "fjalfjla"
    };

    const token = await tokenGen();
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", token)
      .send(invalid_input)
      .expect(400);
    done();
  });
});
