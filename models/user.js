const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  accessCode: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }], // Reference to Todo
});

const User = mongoose.model("User", userSchema);

module.exports = User;
