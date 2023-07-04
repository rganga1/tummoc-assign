import Express from "express"
import { signUpController } from "../controllers/userController.js"
import { signInController } from "../controllers/userController.js"
import passport from "passport"

const router=Express.Router()

router.post("/sign-in",signInController)
router.post("/sign-up",signUpController)

export default router;