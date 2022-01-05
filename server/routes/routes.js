import express, {Router} from "express"
import TodoModel from "../models/todomodel.js"
const todoRoute = express.Router()

todoRoute.get("/todos", async (req, res) => {
  try {
    const todo = await TodoModel.find()
    res.send(todo)
  } catch (error) {
    res.send(error)
  }
})
todoRoute.post("/add", async (req, res) => {
  const newTodo = new TodoModel({title: req.body.title})
  try {
    const todo = await newTodo.save()
    res.send(todo)
  } catch (error) {
    res.send(error)
  }
})
todoRoute.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id)
    res.send(todo)
  } catch (error) {
    res.send(error)
  }
})
todoRoute.put("/mark/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id)
    todo.completed = !todo.completed
    todo.save()
    res.send(todo)
  } catch (error) {
    res.send(error)
  }
})
export default todoRoute
