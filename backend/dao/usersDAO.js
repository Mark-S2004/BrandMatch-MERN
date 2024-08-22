import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

let users

export default class UsersDAO {
  static async injectDB(client) {
    if (users) {
      return
    }

    try {
      users = await client.db(process.env.BRANDMATCH_NS).collection("users")
    } catch (e) {
      console.error(`Unable to establish a collection handle in UsersDAO: ${e}`)
    }
  }

  static async getUsers({ filters = null, page = 0, usersPerPage = 20 }) {
    try {
      let query
      if (filters) {
        if ("username" in filters) {
          query = { username: { $regex: filters["username"], $options: "i" } }
        }
      }

      const users = await User.find(query)
        .limit(usersPerPage)
        .skip(usersPerPage * page)
        .exec()

      const usersCount = await User.countDocuments(query)

      return { users, usersCount }
    } catch (e) {
      console.error(`Error in UsersDAO getUsers method: ${e}`)
      return []
    }
  }

  static async getUser(username) {
    try {
      return await User.findOne({ username: username }).exec()
    } catch (e) {
      console.error(`Error in UsersDAO getUser by username method: ${e}`)
    }
  }

  static async createUser(username, password) {
    try {
      let user = new User({ username, password })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: { id: user.id },
      }

      const jwtToken = await new Promise((resolve, reject) =>
        jwt.sign(
          payload,
          process.env.JWTSECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) reject(err)
            resolve(token)
          }
        )
      )
      return jwtToken
    } catch (e) {
      console.error(`Error in UsersDAO createUser method: ${e}`)
    }
  }
}
