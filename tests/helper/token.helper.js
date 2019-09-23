const request = require("supertest");
const app = require("../../server");

module.exports = async (
  email = "pdvanil980@gmail.com",
  password = "4343jljflaf"
) => {
  const valid_input = {
    email,
    password
  };

  const res = await request(app)
    .post("/api/users/login")
    .send(valid_input);

  return res.body.token;
};
