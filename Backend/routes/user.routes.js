const express = require("express");
const userModel = require("../models/User.model");
const userRouter = express.Router();

userRouter.use(express.json());
userRouter.get("/", (req, res) => {
  res.send("From the User Router");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = new userModel({ name: name, email: email, password: password });
    await userModel
      .findOne({ $or: [{ name: { $eq: name } }, { email: { $eq: email } }] })
      .then((result) => {
        if (result) {
          res.send(true);
        } else {
          user.save();
          res.send(false);
        }
      });
  } catch (error) {
    res.send({
      message: "Error Detected",
      status: 0,
    });
    console.error(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let data = await userModel.find({ email });
    if (data.length > 0 && data[0].password == password) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res.send({
      Error: true,
      status: 0,
    });
  }
});
module.exports = userRouter;
