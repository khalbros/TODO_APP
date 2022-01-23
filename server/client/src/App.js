import React, {useState, useEffect} from "react"
import Axios from "axios"

const axios = Axios.create({
  baseURL: `https://react-todo-tracker.herokuapp.com`,
})

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [popup, setPopup] = useState(true)

  const onChangeHandler = (e) => {
    const value = e.target.value
    setNewTodo(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("/add", {
        title: newTodo,
      })
      .then((res) => {
        console.log(newTodo)
        alert("Added Successfully")
      })
      .catch(() => alert("Something Wrong"))
    setPopup(!popup)
    setNewTodo("")
  }
  const handleDelete = (id) => {
    axios.delete("/delete/" + id).then((res) => {
      alert("Deleted")
    })
  }
  const handleMark = (id) => {
    axios.put("/mark/" + id).then((res) => {})
  }
  useEffect(() => {
    axios.get("/todos").then((res) => {
      setTodos(res.data)
    })
  }, [todos])

  return (
    <div className="App">
      <div className="todos">
        <div className="heading">
          <h3>Lorem, ipsum dolor.</h3>
          <h4>Lorem ipsum dolor sit amet consectetur.</h4>
          <div></div>
        </div>
        {todos.map((todo) => (
          <div
            className={todo.completed ? "todo complete" : "todo"}
            key={todo._id}
            onClick={() => handleMark(todo._id)}>
            <div className="check"></div>
            <div className="text">{todo.title}</div>
            <div className="delete" onClick={() => handleDelete(todo._id)}>
              x
            </div>
          </div>
        ))}
      </div>
      <div className={popup ? "close" : "popup-model"}>
        <div className="popup-body">
          <div className="heading">
            <h3>Add Something New</h3>
            <h3 className="close-btn" onClick={() => setPopup(true)}>
              x
            </h3>
          </div>

          <input
            type="text"
            name="title"
            id=""
            className="text-input"
            value={newTodo}
            onChange={onChangeHandler}
          />
          <button type="submit" className="add-btn" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
      <div className="model-btn" onClick={() => setPopup(false)}>
        <h4>+</h4>
      </div>
    </div>
  )
}

export default App
