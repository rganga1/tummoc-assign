import Express from "express"
import { signUpController } from "../controllers/userController.js"
import { signInController } from "../controllers/userController.js"
import passport from "passport"
import passportService from "../passport.js"
import {googleAuthController} from "../controllers/userController.js"

import colors  from "colors"

const router=Express.Router()

router.post("/sign-up",signUpController)
router.post("/sign-in",passport.authenticate('local',{session:false}),signInController)
router.get("/private",passport.authenticate('jwt',{session:false}),(req,res)=>res.send("This is private route"))
// router.get("/private",(req,res)=>res.send("This is private route"))

router.get("/auth/google",passport.authenticate("google",{scope:['profile','email']}))
router.get("/auth/google/callback",passport.authenticate("google"),googleAuthController)

export default router;