const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressOasGenerator = require("express-oas-generator");

const app = express();

// : middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// oas generator
expressOasGenerator.init(app, {});

const db = require("./config/keys").mongoURI;

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(success => console.log("mongodb connected"))
  .catch(err => console.log(err));

// : passport midlleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("hello world"));

app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users);

const port = process.env.PORT || 5000;
//app.listen(port, () => {
//  console.log("app is start and running on localhost:" + port);
//});

module.exports = app;
