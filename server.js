const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const todosRouter = require("./routes/todos");

// Load environment variables
dotenv.config();

// Set up view engine and connect to database
app.set("view engine", "ejs");
mongoose.connect(process.env.Databaseurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/todos", todosRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login", { message: {} });
});

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
