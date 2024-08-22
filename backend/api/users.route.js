import express from "express"
import UsersController from "./users.controller.js"

const router = express.Router()

router.route("/register").post(UsersController.apiPostRegister)
router.route("/login").post(UsersController.apiPostLogin)
router.route("/users").get(UsersController.apiGetUsers)

export default router
