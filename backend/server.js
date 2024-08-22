import express from "express"
import cors from "cors"
import authRouter from "./api/users.route.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("*", (req, res) =>
  res.status(404).json({ error: "Resource not found" })
)

export default app
