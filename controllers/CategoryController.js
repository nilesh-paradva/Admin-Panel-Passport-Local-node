const CategoryModel = require("../models/CategorySchema");

const CatagoryPageGet = (req, res) => {
    res.render("pages/category");
}

const AddCategory = async (req, res) => {
    try{
        const { category } = req.body;
        await CategoryModel.create({ category });
        res.redirect("/addCategory");
    }catch(err){
        console.log("Category already exists!");
        res.redirect("/addCategory");
    }
}

const ViewCategoryPage = async (req, res) => {
    const CategoryList = await CategoryModel.find({});
    res.render("pages/ViewCategory", { CategoryList });
}

const DeleteCategory = async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.redirect("/listCategory");
}

const EditCategory =  async(req,res) => {
    const CategoryEdit = await CategoryModel.findOne({_id: req.params.id})
    res.render("pages/EditCategory", {CategoryEdit});
}

const UpdateCategory = async(req,res)=> {
    await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/listCategory");
}

module.exports = { CatagoryPageGet, AddCategory, ViewCategoryPage, DeleteCategory, EditCategory, UpdateCategory};