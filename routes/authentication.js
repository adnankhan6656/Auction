const express = require("express");
const router = express.Router();
const logger = require("../controllers/logger");
const login = require("../controllers/login");

router.get("/register",(req,res)=>{
   try{
      res.render("pages/sign_up")
   }
   catch(error){
     logger.error(error)
   }
});

router.post("/register",(req,res)=>{
  try{
      let data = req.body;
      let firstName = data.firstName;
      let lastName = data.lastName
      let email = data.email;
      let dob = data.dob
      let role = data.role
      let gender = data.gender
      res.render("pages/sign_up")
  }
  catch(error){
    logger.error(error)
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    logger.error(error);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    logger.error(error);
  }
});

router.post("/login", login.loginUser);



router.get("/activation", (req, res) => {
  try {
    res.render("pages/activation");
  } catch (error) {
    logger.error(error);
  }
});
router.get("/forgot_password", (req, res) => {
  try {
    res.render("pages/forgot_password");
  } catch (error) {
    logger.error(error);
  }
});

module.exports = router;
