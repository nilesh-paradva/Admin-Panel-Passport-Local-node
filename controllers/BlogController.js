const AdminModel = require("../models/AdminSchema.js");
const BlogModel = require("../models/blogModel.js");
const fs = require("fs");

const addBlog = (req, res) => {res.render("pages/addBlog")}
const editBlogPage = async (req,res) => {
    const {id} = req.params
    const blogGet = await BlogModel.findOne({_id : req.params.id});
    res.render("pages/EditBlog",{blogGet});
}

const UpdateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        (req.file && blog.blogImag) ? fs.unlinkSync(blog.blogImag) : console.log("blog Img Not Delete");
        await BlogModel.findByIdAndUpdate(req.params.id, req.file ? { blogImag: req.file.path, ...req.body } : req.body);
        res.redirect("/profile");
    } catch (error) {
        console.error(error);
    }
};


const BlogDelete = async (req,res) => {
    const blog = await BlogModel.findById(req.params.id);
    if (blog.blogImag) {
        fs.unlinkSync(blog.blogImag); 
    }
    await BlogModel.findByIdAndDelete(req.params.id);
    res.redirect("/profile");
}

const postBlog = async (req, res) => {
    try {
        const { title, Blogdescription } = req.body;
        const NewBlog = new BlogModel({
            title,
            Blogdescription,
            authorId: req.user._id,
            blogImag : (req.file) ? req.file.path : null
        });
        await NewBlog.save();
        res.redirect("/ViewBlog");
    } catch (error) {
        console.error("Error post blog:", error);
    }
};

const ViewBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        const BlogList = blogs.map(async (blog) => {
            const admin = await AdminModel.findOne({ _id: blog.authorId });
            return {...blog.toObject(), admin};
        });
        const AdminBlog = await Promise.all(BlogList); 
        res.render("pages/viewBlog", {AdminBlog});

    } catch (error) {
        console.error("Error blog :", error);
    }
};


module.exports = { addBlog, postBlog, ViewBlog, editBlogPage, UpdateBlog, BlogDelete }