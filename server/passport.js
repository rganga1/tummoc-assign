import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/userModel.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  // secretOrKey: process.env.SECRET_KEY
  secretOrKey: "secret1",
};

passport.use(
  new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findOne({ email: payload.email })
      .then(function (user) {
        if (user) {
          req.body.user={...user};
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ email: email }).then(function (user) {
      console.log(user.email, email);
      console.log(user.password, password);
      if (!user) {
        return done(null, false);
      }

      // (async()=>{
      //   const hashedPassword = await bcrypt.hash(user.password, 10)
      // console.log('hashedPassword', hashedPassword)
      // console.log('user.password', user.password)
      // if (hashedPassword==password) return done(null,user)
      // else return done()
      // })()

      user
        .matchPassword(password)
        .then((isMatch) => {
          if (isMatch) {
            // Password matches
            console.log("Password matches");
            return done(null, user);
          } else {
            // Password does not match
            console.log("Password does not match");
          }
        })
        .catch((err) => {
          // Error comparing passwords
          console.error("Error comparing passwords:", err);
        });
    });
  })
);

passport.use(
  new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: "/users/auth/google/callback",
  },
  (accessToken,refreshToken,profile,done)=>{
    console.log('accessToken', accessToken);
    console.log('profile', profile);

    // User.findOne({email:profile.email}).then((currentUser)=>{if(currentUser)done(null,currentUser)})

    done(null,profile)
  })
);

export default "service";
