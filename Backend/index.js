const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const userRouter = require("./routes/user.routes");
const noteRouter = require("./routes/note.routes");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  let data = ["Bharath","Prabhath","Danush"];
  res.send("hi");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log("Error");
  }

  console.log("Server is running");
});
