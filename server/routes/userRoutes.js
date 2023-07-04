import Express from "express"
import { signUpController } from "../controllers/userController.js"
import { signInController } from "../controllers/userController.js"
import passport from "passport"
import passportService from "../passport.js"

import { generateToken } from "../controllers/userController.js"
import colors  from "colors"

const router=Express.Router()

router.post("/sign-up",signUpController)
router.post("/sign-in",passport.authenticate('local',{session:false}),signInController)
// router.post("/sign-in",passport.authenticate('local',{session:false}),signInController)

// router.post('/sign-in', function (req, res, next) {
//   console.log("I'm in routes".green.inverse);
//   passport.authenticate('local', {session: false}, (err, user, info) => {
//     console.log("I'm in routes".blue.inverse);
//       if (err || !user) {
//           return res.status(400).json({
//               message: 'Something is not right',
//               user   : user
//           });
//       }
//      req.login(user, {session: false}, (err) => {
//          if (err) {
//              res.send(err);
//          }
//          // generate a signed son web token with the contents of user object and return it in the response
//          const token = generateToken(req.body.email);
//          return res.json({user, token});
//       });
//   })(req, res,next);
// });

export default router;