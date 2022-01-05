import "dotenv/config.js"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoute from "./routes/routes.js"

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/todo", todoRoute)

mongoose.connect(process.env.DB_CONNECT).then(
  () => {
    console.log("Database is connected")
  },
  (err) => {
    console.log("Can not connect to the database" + err)
  }
)

app.listen(port, () => console.log("server running on PORT:" + port))