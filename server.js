require("dotenv").config();
const cors = require("cors");
// const { error } = require("console");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose");

mongoose.connect(process.env.Databaseurl);
const db = mongoose.connection;
const Port = 3000;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.use(express.json());
app.use(cors());
const todosRouter = require("./routes/todos");
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
