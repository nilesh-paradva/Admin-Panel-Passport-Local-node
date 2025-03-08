const express = require("express");
const ProfileRoute = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const Multer = require("../middleware/Multer");
const ProfileController = require("../controllers/ProfileController");
const AdminGet = require("../middleware/userGetmiddleware")

ProfileRoute.get("/profile", authMiddleware.authMiddleware, AdminGet, ProfileController.profile);
ProfileRoute.get("/profileImgDelete/:id", ProfileController.profileImgDelete);
ProfileRoute.post("/profileEdit/:id", ProfileController.profileEdit)
ProfileRoute.post("/profileImg/:id", Multer.single("profileImg"), ProfileController.profileImg);
ProfileRoute.post("/ProfilePassChange/:id", ProfileController.PassChange)

module.exports = ProfileRoute