require("dotenv").config();

const express = require("express");

require("./db/connection");
const app = express();

const cors = require("cors");

const userDB = require("./model/userSchema");

const PORT = 6005;

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const clientID =
  "1059600812013-9mrek1gvkf0bfnb844rkfvjja87frke6.apps.googleusercontent.com";
const clientSecret = "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";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json("server start ");
// });

// setup session
app.use(
  session({
    secret: "shubham0201ca221069jec",
    resave: false,
    saveUninitialized: true,
  })
);

// setupPassport
app.use(passport, passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await userDB.findOne({ googleID: profile.id });
        if (!user) {
          user = new userDB({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            Image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
  
);
app.get("/login/success",async(req,res)=>{
  console.log('rqqqqqqqq',req.user)
  if(req.user){
    res.status(200).json({message:"user Login",user:req.user})
  }else{
    res.status(400).json({message:"not authariozed"})
  }
})
app.get('/logout',(req,res,next)=>{
  req.logOut(function(err){
 if(err){return next(err)}
 res.redirect("http://localhost:3000");
  })
})
app.listen(PORT, () => {
  console.log("server started port no. 8005");
});
// 1:11 min
