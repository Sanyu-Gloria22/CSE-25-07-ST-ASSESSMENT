const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");




router.get("/login", (req, res) => { 
  res.render("login");
});

router.post("/login",(req, res) =>{ 

});



module.exports = router;