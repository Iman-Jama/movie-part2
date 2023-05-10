const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // or whatever you're using as your username field
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          console.log("Email not found:", email);
          return done(null, false, { message: "Incorrect email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log("Invalid password for email:", email);
          return done(null, false, { message: "Incorrect email or password" });
        }
        console.log("Successfully authenticated email:", email);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
