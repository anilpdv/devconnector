const request = require("supertest");
const app = require("../../server");
const tokenGen = require("../helper/token.helper");

jest.setTimeout(30000);
describe("Posts post route /api/posts", () => {
  // postive case
  it("should return 200 status and post in response", async done => {
    const valid_input = {
      text:
        "its symbolic nature in the woods, skeptically waking up to see the northen winds."
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/posts")
      .send(valid_input)
      .set("Authorization", token)
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

describe("Post delete route", () => {
  // postive case
  //  it("should return 200 status ", async done => {
  //    const token = await tokenGen();
  //    const res = await request(app).get("/api/posts");
  //    const post_id = res.body.posts[0]._id;
  //    const post_res = await request(app)
  //      .delete("/api/posts/" + post_id)
  //      .set("Authorization", token)
  //      .expect(200);
  //    done();
  //  });
  //
  // negative case
  it("should return 401 status ", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const post_res = await request(app)
      .delete("/api/posts/" + post_id)
      .set("Authorization", token + "s")
      .expect(401);
    done();
  });

  // negative case
  it("should return 404 status ", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_res = await request(app)
      .delete("/api/posts/" + "sjjl")
      .set("Authorization", token)
      .expect(404);
    done();
  });
});

describe("Posts like routes", () => {
  // posive case
  it("should return 200 status and post in response", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const post_res = await request(app)
      .post("/api/posts/like/" + post_id)
      .set("Authorization", token)
      .expect(200);
    done();
  });

  // negative case
  it("should return 400 status and post in response", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const post_res = await request(app)
      .post("/api/posts/like/" + post_id)
      .set("Authorization", token)
      .expect(400);
    done();
  });

  // positive case
  it("should return 200 status and post in response", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const post_res = await request(app)
      .post("/api/posts/unlike/" + post_id)
      .set("Authorization", token)
      .expect(200);
    done();
  });

  // negative case
  it("should return 400 status and post in response", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const post_res = await request(app)
      .post("/api/posts/unlike/" + post_id)
      .set("Authorization", token)
      .expect(400);
    done();
  });
});

// comments routes
describe("Post comments routes", () => {
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const comment_res = await request(app)
      .post("/api/posts/comment/" + post_id)
      .set("Authorization", token)
      .send({ text: "this is supernatural to human to ponder in existence." })
      .expect(200);
    done();
  });

  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const comment_res = await request(app)
      .post("/api/posts/comment/" + post_id)
      .set("Authorization", token)
      .expect(400);
    done();
  });

  // negative case
  it("should return 404 status", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const comment_id = res.body.posts[0].comments[0]._id + "s";
    const comment_res = await request(app)
      .delete("/api/posts/comment/" + post_id + "/" + comment_id)
      .set("Authorization", token)
      .expect(404);
    done();
  });

  it("should return 200 status", async done => {
    const token = await tokenGen();
    const res = await request(app).get("/api/posts");
    const post_id = res.body.posts[0]._id;
    const comment_id = res.body.posts[0].comments[0]._id;
    const comment_res = await request(app)
      .delete("/api/posts/comment/" + post_id + "/" + comment_id)
      .set("Authorization", token)
      .expect(200);
    done();
  });
});
