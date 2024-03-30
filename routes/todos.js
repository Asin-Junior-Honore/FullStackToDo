const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Todo = require("../models/todos");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const secretKey = require("crypto").randomBytes(64).toString("hex");

router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));

function generateToken(user) {
  const payload = {
    userId: user._id,
    userName: user.userName,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized: Token not provided");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

router.post("/signup", async (req, res) => {
  const { userName, accessCode } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const newUser = new User({ userName, accessCode });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { userName, accessCode } = req.body;

  try {
    const user = await User.findOne({ userName, accessCode });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.use(isAuthenticated);

router.get("/userTodos", async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todos = user.todos;

    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found for the user" });
    }

    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { taskTitle, taskDescription } = req.body;
  const userId = req.user.userId;

  try {
    const newTodo = new Todo({ taskTitle, taskDescription, user: userId });
    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.todos.push(newTodo._id);
    await user.save();

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { taskTitle, taskDescription } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { taskTitle, taskDescription } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Deleted todo successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
