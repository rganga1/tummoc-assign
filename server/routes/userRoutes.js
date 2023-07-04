import Express from "express"
import { signUpController } from "../controllers/userController"

const router=Express.router()

router.post("/sign-up",signUpController)