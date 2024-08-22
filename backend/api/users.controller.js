import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UsersDAO from "../dao/UsersDAO.js"

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    try {
      const usersPerPage = req.query.usersPerPage
        ? parseInt(req.query.usersPerPage, 10)
        : 20
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      let filters = {}
      if (req.query.username) {
        filters.username = req.query.username
      }

      const { users, usersCount } = await UsersDAO.getUsers({
        filters,
        page,
        usersPerPage,
      })

      let response = {
        users: users,
        page: page,
        filters: filters,
        entries_per_page: usersPerPage,
        usersCount: usersCount,
      }
      res.json(response)
    } catch (e) {
      console.error(e.message)
      res.status(500).json({ error: "Server Error" })
    }
  }

  static async apiPostRegister(req, res, next) {
    const { username, password } = req.body

    try {
      let user = await UsersDAO.getUser(username)
      if (user) {
        return res.status(400).json({ msg: "User already exists" })
      }

      const token = await UsersDAO.createUser(username, password)
      res.json({ token })
    } catch (e) {
      console.error(e.message)
      res.status(500).json({ error: "Server Error" })
    }
  }

  static async apiPostLogin(req, res, next) {
    const { username, password } = req.body

    try {
      let user = await UsersDAO.getUser(username)
      if (!user) {
        return res.status(400).json({ msg: "INvalid credentials" })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

      const payload = {
        user: { id: user.id },
      }
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).json({ error: "Server Error" })
    }
  }
}
