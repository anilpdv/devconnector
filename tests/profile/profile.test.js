const request = require("supertest");
const tokenGen = require("../helper/token.helper");
const Profile = require("../../models/Profile");

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
  // positive case
  it("should return 200 status and profile in response", async done => {
    const token = await tokenGen();
    const input = {
      title: "trainee",
      company: "msr comsos",
      from: "11/05/2019"
    };

    const res = request(app)
      .post("/api/profile/experience")
      .set("Authorization", token)
      .send(input)
      .expect(200);
    done();
  });
  // negative case
  it("should return 400 ", async done => {
    const token = await tokenGen();
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

// education route
describe("Profile education routes", () => {
  // positive case
  it("should return 200 status", async done => {
    try {
      const token = await tokenGen();
      const res = await request(app)
        .post("/api/profile/education")
        .set("Authorization", token)
        .send({
          school: "stanford",
          degree: "computer science",
          from: "05/11/1996"
        })
        .expect(200);
      done();
    } catch (err) {
      done(err);
    }
  });

  // negative case
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/education")
      .set("Authorization", token)
      .send({ school: "" })
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(1);
    done();
  });

  // negative  case
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/education")
      .set("Authorization", token)
      .send({ school: "stanford", degree: "computer science", from: "" })
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
    done();
  });

  // negative  case
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/education")
      .set("Authorization", token)
      .send({ school: "stanford", degree: "", from: "20-05-1996" })
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
    done();
  });

  // negative  case
  it("should return 400 status", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .post("/api/profile/education")
      .set("Authorization", token)
      .send({ school: "", degree: "computer science", from: "20-05-1996" })
      .expect(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
    done();
  });
});

// profile delete routes
describe("profile Delete Routes", () => {
  it("should return 200 and profile in res", async done => {
    const token = await tokenGen();
    const profile_res = await request(app)
      .get("/api/profile")
      .set("Authorization", token);
    const education_id = profile_res.body.profile.education[0]._id;
    console.log(profile_res.body.profile);
    const route = "/api/profile/education/" + education_id;
    console.log(route);
    const education_res = await request(app)
      .delete(route)
      .set("Authorization", token)
      .expect(200);
    expect(education_res.body.profile).toBeTruthy();
    done();
  });
  // deleting experience/:id
  //it("should return 200 and profile in res", async done => {
  //  const token = await tokenGen();
  //  const profile_res = await request(app)
  //    .get("/api/profile")
  //    .set("Authorization", token);
  //  const experience_id = profile_res.body.profile.experience[0]._id;
  //  console.log(profile_res.body.profile);
  //  const route = "/api/profile/experience/" + experience_id;
  //  console.log(route);
  //  const experience_res = await request(app)
  //    .delete(route)
  //    .set("Authorization", token)
  //    .expect(200);
  //  expect(experience_res.body.profile).toBeTruthy();
  //  done();
  //});

  // deleting profile route
  it("should return 200 status and message success equal to true ", async done => {
    const token = await tokenGen();
    const res = await request(app)
      .delete("/api/profile")
      .set("Authorization", token)
      .expect(200);
    done();
  });
});
