import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      // Authentication succeeded
      return done(null, user);//user sent to controller
    } catch (err) {
      return done(err);
    }
  }
));