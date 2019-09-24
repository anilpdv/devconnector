const request = require("supertest");
const tokenGen = require("../helper/token.helper");

const app = require("../../server");
const valid_input = {
  email: "pdvanil980@gmail.com",
  password: "4343jljflaf"
};
// : changing defult jest timeout
jest.setTimeout(30000);
describe("Profile post /api/profile route", () => {
  // positive case
  it("should return 200 status", async done => {
    const input = {
      status: "working",
      skills: "nodejs,reactjs",
      handle: "anilpdv"
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(input)
      .expect(200);
    done();
  });

  // negative case
  it("should return 400 status errors greater than 1", async done => {
    const input = {
      status: "",
      skills: "",
      handle: ""
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(input)
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(1);
    done();
  });

  // negative case
  it("should return 400 status errors greater than 1", async done => {
    const input = {
      status: "working",
      skills: "",
      handle: "anilpdv"
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(input)
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
    expect(res.body.errors[0].msg).toEqual("skills are required");
    done();
  });
  // negative case
  it("should return 400 status with message status is required", async done => {
    const input = {
      status: "working",
      skills: "a,b,c",
      handle: ""
    };
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(input)
      .expect(400);
    console.log(res.body.errors);
    expect(res.body.errors[0].msg).toEqual("should be length of 5 or more");
    done();
  });
  // negative case
  it("should return 400 status ", async done => {
    const invalid_input = {
      status: "",
      skills: "a,b,c,d",
      handle: "anilpdv"
    };
    const token = await tokenGen(valid_input.email, valid_input.password);

    const res = await request(app)
      .post("/api/profile")
      .set("Authorization", token)
      .send(invalid_input)
      .expect(400);
    done();
  });
});

// : profile routes requests
describe("Profile Get /api/profile requests", () => {
  // postive case
  it("should return 200 and profile to exist", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", token)
      .expect(200);
    expect(res.body.profile).toBeTruthy();

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

// experience routes
describe("Profile /experience routes", () => {
  // negative case
  it("should return 400 ", async done => {
    const token = await tokenGen(valid_input.email, valid_input.password);
    const res = await request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send({ title: "" })
      .expect(400);
    done();
  });

  // negative case
  it("should return 400 ", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send({ title: "developer", company: "", from: "20-05-2015" })
      .expect(400);
    done();
  });

  // negative case
  it("should return 400 ", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send({ title: "", company: "msr", from: "20-05-2015" })
      .expect(400);
    done();
  });
  // negative case
  it("should return 400 ", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send({ title: "anilpdv", company: "msr", from: "" })
      .expect(400);
    done();
  });
});

// education routes
describe("Profile education routes", () => {
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = request(app)
      .post("/api/profile/education")
      .set("Authentication", token)
      .send({ school: "" })
      .expect(400);
    done();
  });
});
