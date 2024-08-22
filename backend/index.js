import app from "./server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UsersDAO from "./dao/UsersDAO.js"
dotenv.config()

const port = process.env.PORT || 8000

mongoose
  .connect(process.env.BRANDMATCH_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async (client) => {
    // UsersDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
