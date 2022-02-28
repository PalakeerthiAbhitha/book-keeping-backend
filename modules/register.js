const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Registering the data to the Database */
module.exports.signup = async (req, res, next) => {
  /* Check wheather Email is already present in db or not */
  const existUser = await mongo.db
    .collection("register")
    .findOne({ email: req.body.email });
  if (existUser) {
    return res.status(400).send({ msg: "Email already Exists" });
  }
  const salt = await bcrypt.genSalt(5);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  var data = await mongo.db.collection("register").insertOne(req.body);
  res.send(data);
};

/* Login using user Credentials */
module.exports.signin = async (req, res, next) => {
  /* Check for existing user or not */
  const existUser = await mongo.db
    .collection("register")
    .findOne({ email: req.body.email });
  if (!existUser) {
    return res.send(400).send({ msg: "Email is not exitst" });
  }

  const isValid = await bcrypt.compare(req.body.password, existUser.password);
  if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

  const token = jwt.sign(existUser, "AGILE", { expiresIn: "1hr" });
  res.send(token);
};

