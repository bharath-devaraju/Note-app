const express = require("express");
const noteModel = require("../models/note.model");

const noteRouter = express.Router();
noteRouter.use(express.json());

noteRouter.get("/", (req, res) => {
  res.send("From Notes");
});

noteRouter.post("/create", async (req, res) => {
  const { title, body, user } = req.body;
  try {
    noteData = new noteModel({ title: title, body: body, user: user });
    noteData.save();
    res.send("Note Added!!");
  } catch (error) {
    res.send({
      Error: true,
      status: 0,
    });
  }
});

noteRouter.post("/find", async (req, res) => {
  const data = req.body;
  try {
    if (Object.keys(data).length != 0 && data["title"]) {
      const record = await noteModel.find({ title: { $eq: data["title"] } });
      if (!Object.keys(record).length) {
        res.send("No note with the above title");
      } else {
        res.send(record);
      }
    } else {
      res.send("Incorrect Format");
    }
  } catch (error) {
    console.error(error);
    res.send({
      Error: true,
      status: 0,
    });
  }
});
module.exports = noteRouter;
