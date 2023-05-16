const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Replace "email" with "username"
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } }); // Replace "email" with "username"
        if (!user) {
          console.log("Username not found:", username); // Replace "Email" with "Username"
          return done(null, false, {
            message: "Incorrect username or password",
          }); // Replace "Email" with "Username"
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log("Invalid password for username:", username); // Replace "Email" with "Username"
          return done(null, false, {
            message: "Incorrect username or password",
          }); // Replace "Email" with "Username"
        }
        console.log("Successfully authenticated username:", username); // Replace "Email" with "Username"
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function (user_id, done) {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
