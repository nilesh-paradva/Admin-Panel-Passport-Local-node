const express = require("express");
const BlogRoute = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const Multer = require("../middleware/Multer");
const AdminGet = require("../middleware/userGetmiddleware");
const BlogControler = require("../controllers/BlogController")

BlogRoute.get("/addBlog", AuthMiddleware.authMiddleware, AdminGet, BlogControler.addBlog);
BlogRoute.get("/ViewBlog", AuthMiddleware.authMiddleware, AdminGet, BlogControler.ViewBlog);
BlogRoute.get("/blogedit/:id", AuthMiddleware.authMiddleware, AdminGet, BlogControler.editBlogPage);
BlogRoute.get("/blogs/delete/:id", BlogControler.BlogDelete);
BlogRoute.post("/addBlog",Multer.single("blogImg"),BlogControler.postBlog);
BlogRoute.post("/blogs/edit/:id", Multer.single("blogImg"), BlogControler.UpdateBlog)

module.exports = BlogRoute