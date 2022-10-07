const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const knex = require("knex");
// const { response } = require("express");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "pdk@sql123",
    database: "smartbrain",
  },
});

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt, saltRounds);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImageEntries(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("This app is running on port 3000");
});

// END points:
// ==> res = this is working
// /signin ==> POST = success/fail
// /register ==> POST = user
// /profile/:userId ==> GET = user
// /image ==> PUT ==> user
