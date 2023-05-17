const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Configure passport to use LocalStrategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Replace "email" with "username"
      passwordField: "password",
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

// Serializes the user to store in the session
//Serializing is the process of changing data into a format that is easily stored such as a string
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

// Deserializes user from the session
//Deserializing finds the corresponding data which allows the app to indentify and authenticate based on the stored session data
passport.deserializeUser(async (user_id, done) => {
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
