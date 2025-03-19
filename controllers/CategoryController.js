const CategoryModel = require("../models/CategorySchema");

const CatagoryPageGet = (req, res) => {
    res.render("pages/category");
}

const AddCategory = async (req, res) => {
    const { category } = req.body;
    const existingCategory = await CategoryModel.findOne({ category });
    if (existingCategory) return res.status(400).json({ message: "Category already exists!" });
    const SaveCategory = await new CategoryModel({
        category
    })
    await SaveCategory.save();
    res.redirect("/addCategory");
}

const ViewCategoryPage = async (req, res) => {
    const CategoryList = await CategoryModel.find({});
    res.render("pages/ViewCategory", { CategoryList });
}

const DeleteCategory = async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.redirect("/listCategory");
}

module.exports = { CatagoryPageGet, AddCategory, ViewCategoryPage, DeleteCategory };