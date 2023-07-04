import Express from "express"
import { signUpController } from "../controllers/userController.js"

const router=Express.Router()

router.post("/sign-up",signUpController)

export default router;