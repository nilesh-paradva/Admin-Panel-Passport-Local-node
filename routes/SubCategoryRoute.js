const express = require("express");
const SubCategoryRoute = express.Router();
const SubCategoryController = require("../controllers/SubCategoryController")

SubCategoryRoute.get("/addSubCategory", SubCategoryController.SubCategoryPageGet);
SubCategoryRoute.post("/subcategoryAdd", SubCategoryController.SubCategoryPost)

module.exports = SubCategoryRoute;