import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy } from "passport-local";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
  User.findOne({ email: email }).then(function(user) {
    console.log(user.email,email);
    console.log(user.password,password);
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    // bcrypt.comparePassword(password, user.password, function(err, isMatch) {
    //   if (err) { return done(err); }
    //   if (!isMatch) { return done(null, false); }

    //   return done(null, user);
    // });

    // (async()=>{
    //   const hashedPassword = await bcrypt.hash(user.password, 10)
    // console.log('hashedPassword', hashedPassword)
    // console.log('user.password', user.password)
    // if (hashedPassword==password) return done(null,user)
    // else return done()
    // })()

    // const hashedPassword =  bcrypt.hash(user.password, 10)
    // console.log('hashedPassword', hashedPassword)
    // console.log('user.password', user.password)
    // if (hashedPassword==password) return done(null,user)
    // else return done()

    user.matchPassword(password)
      .then(isMatch => {
        if (isMatch) {
          // Password matches
          console.log('Password matches');
          return done(null,user)
        } else {
          // Password does not match
          console.log('Password does not match');
        }
      })
      .catch(err => {
        // Error comparing passwords
        console.error('Error comparing passwords:', err);
      });
  })
  }));

// passport.use(new LocalStrategy(
//   {
//     usernameField: 'email'
//   },
//   (email, password, done) => {
//     User.findOne({ email })
//       .then(user => {
//         if (!user) {
//           return done(null, false, { message: 'Incorrect email or password' });
//         }

//         bcrypt.compare(password, user.password)
//           .then(isPasswordValid => {
//             if (!isPasswordValid) {
//               return done(null, false, { message: 'Incorrect email or password' });
//             }

//             return done(null, user);
//           })
//           .catch(err => done(err));
//       })
//       .catch(err => done(err));
//   }
// ));

// passport.use(new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   async (email, password, done) => {
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return done(null, false, { message: 'Incorrect email or password' });
//       }

//       // Compare the password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return done(null, false, { message: 'Incorrect email or password' });
//       }

//       // Authentication succeeded
//       return done(null, user);//user sent to controller
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

export default "service"