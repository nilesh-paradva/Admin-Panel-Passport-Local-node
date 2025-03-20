const CategoryModel = require("../models/CategorySchema");
const SubCatagoryModel = require("../models/SubCategorySchema");

const SubCategoryPageGet = async(req,res) => {
    const categorydata = await CategoryModel.find({});
    res.render("pages/SubCategory", {categorydata});
}

const SubCategoryPost = async(req, res) =>{
    try{
        const{subcategory, categoryId} = req.body;
        await SubCatagoryModel.create({
            subcategory,
            categoryId
        })
        res.redirect("/addSubCategory");
    }catch(err) {
        console.log("Sub Category Alredy Exist!");
    }
}

module.exports = {SubCategoryPageGet, SubCategoryPost}