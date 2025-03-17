const express = require("express");
const AuthRoutes = express.Router();
const AuthController = require("../controllers/AuthController");
const passport = require("../middleware/PassportMiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");

// Auth Route
AuthRoutes.get("/authsignin",AuthMiddleware.uthPageSecure, AuthController.authsignin);
AuthRoutes.get("/authsignup",AuthMiddleware.uthPageSecure, AuthController.authsignup);
AuthRoutes.get("/SignOut", AuthController.SignOut);
AuthRoutes.get("/forgotPassword", AuthController.forgotPassword)
AuthRoutes.post("/register", AuthController.register);
AuthRoutes.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), AuthController.authLogin);
AuthRoutes.post("/otp-generate", AuthController.OtpGenerate);
AuthRoutes.post("/verify-otp", AuthController.verifyOtp);
AuthRoutes.post("/reset-password", AuthController.ResetPassword)

module.exports = AuthRoutes