const express = require("express");
const router = express.Router();
const Todos = require("../models/todos");
const todo = require("../models/todos");
router.get("/", async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getTodo, (req, res) => {
  res.send(res.todo);
});

router.post("/", async (req, res) => {
  const todo = new Todos({
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getTodo, async (req, res) => {
  if (req.body.taskTitle != null) {
    res.todo.taskTitle = req.body.taskTitle;
  }
  if (req.body.taskDescription != null) {
    res.todo.taskDescription = req.body.taskDescription;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.deleteOne();
    res.json({ message: "deleted todo succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todos.findById(req.params.id);
    if (todo == null) {
      return res.status(400).json({ message: "sorry todo not found😔" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.todo = todo;
  next();
}
module.exports = router;
