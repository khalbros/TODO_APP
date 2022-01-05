import mongoose from "mongoose"
const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
})

const TodoModel = mongoose.model("todos", todoSchema)
export default TodoModel
