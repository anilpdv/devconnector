const request = require("supertest");
const app = require("../../server");

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
