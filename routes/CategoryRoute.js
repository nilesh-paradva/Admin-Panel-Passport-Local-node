const express = require("express");
const categoryRoute = express.Router();
const CategoryController = require("../controllers/CategoryController");
const AdminGet = require("../middleware/userGetmiddleware");
const AuthMiddleware = require("../middleware/AuthMiddleware");

categoryRoute.get("/addCategory",AuthMiddleware.authMiddleware, AdminGet, CategoryController.CatagoryPageGet);
categoryRoute.get("/listCategory",AuthMiddleware.authMiddleware, AdminGet, CategoryController.ViewCategoryPage)
categoryRoute.get("/DeleteCategory/:id",AuthMiddleware.authMiddleware, AdminGet, CategoryController.DeleteCategory);
categoryRoute.get("/editCategory/:id", AuthMiddleware.authMiddleware, AdminGet, CategoryController.EditCategory)
categoryRoute.post("/categoryAdd",AdminGet, CategoryController.AddCategory);
categoryRoute.post("/categoryEdit/:id", AdminGet, CategoryController.UpdateCategory);

module.exports = categoryRoute;