import React, {useState, useEffect} from "react"
import axios from "axios"
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
      .post("http://localhost:5000/todo/add", {
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
    axios.delete("http://localhost:5000/todo/delete/" + id).then((res) => {
      alert("Deleted")
    })
  }
  const handleMark = (id) => {
    axios.put("http://localhost:5000/todo/mark/" + id).then((res) => {})
  }
  useEffect(() => {
    axios.get("http://localhost:5000/todo/todos").then((res) => {
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
