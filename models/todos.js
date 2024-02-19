const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },

  taskSubmitedDate: {
    type: Date,
    requried: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("todos", todoSchema);
