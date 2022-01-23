import "dotenv/config.js"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"
import todoRoute from "./routes/routes.js"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/", todoRoute)

app.use(express.static(path.join(__dirname, "/client/build")))
app.get("*", (req, res) => {
  res.send(path.join(__dirname, "/client/build", "iindex.html"))
})

mongoose
  .connect(process.env.DB_CONNECT)
  .then(
    () => {
      console.log("Database is connected")
      app.listen(port, () => console.log("server running on PORT:" + port))
    },
    (err) => {
      console.log("Can not connect to the database" + err)
    }
  )
  .catch((err) => console.log(err))
