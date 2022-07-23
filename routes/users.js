const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const authenticate = require("../middlewares/authenticate");

const userController = require('../controllers/userController')

/* @usage : Register a User
    @url : /api/users/register
    @access : PUBLIC */
router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("firstName is Required!"),
    body("lastName").notEmpty().withMessage("lastName is Required!"),
    body("email").notEmpty().withMessage("email is Required!"),
    body("password").notEmpty().withMessage("password is Required!"),
  ],

  userController.registerUser
);

/* @usage : Login a User
    @url : /api/users/login
    @access : PUBLIC */
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("email is Required!"),
    body("password").notEmpty().withMessage("password is Required!"),
  ],
  userController.loginUser
);

/*
    @usage : Get User Info
    @url : /api/users/
    @access : PRIVATE
 */

router.get("/user", authenticate, userController.getUserInfo

);

/*
    @usage : Update Address of a User
    @url : /api/users/address
    @access : PRIVATE
 */

router.post(
  "/address",
  authenticate,
  [
    body("flat").notEmpty().withMessage("Flat is Required"),
    body("street").notEmpty().withMessage("Street is Required"),
    body("landmark").notEmpty().withMessage("Landmark is Required"),
    body("city").notEmpty().withMessage("City is Required"),
    body("state").notEmpty().withMessage("State is Required"),
    body("country").notEmpty().withMessage("Country is Required"),
    body("pin").notEmpty().withMessage("Pin is Required"),
    body("mobile").notEmpty().withMessage("Mobile is Required"),
  ],
  userController.updateAdress
);

module.exports = router;
