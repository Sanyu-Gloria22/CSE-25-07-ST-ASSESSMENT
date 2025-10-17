// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");

require("dotenv").config();
const User = require('./models/signupModel');


//import routes
const authRoutes = require("./routes/authRoutes");
const signupModel = require("./models/signupModel");

//installations
const app = express();
const port = 3001;

//setting up mon
mongoose.connect(process.env.MONGODB_URL, {
  //  useNewUrlParser: true,
  //  useUnifiedTopology: true
});

mongoose.connection
  .on('open', async () => {
    console.log(' Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


// setting view engine
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(methodOverride("_method"));
//using express
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 

//express session configs
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
  cookie: {maxAge:24*60*60*1000}
}))

//passport configs
app.use(passport.initialize());
app.use(passport.session());

//authenticate with passport local strategy
passport.use(User.createStrategy({ usernameField: "emailAddress" }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Routes
app.use("/",authRoutes);


app.use((req, res) => {
  res.status(404).send(`Oops! Route not found.`);
});


app.listen(port, () => console.log(`listening on port ${port}`));
