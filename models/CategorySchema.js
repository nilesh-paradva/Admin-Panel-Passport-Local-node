const mongoose = require("mongoose");


const CateGortSchema = mongoose.Schema({
    category:{
        type: String,
        required: true,
        // unique: true, 
        trim: true,
    },
})

const CategoryModel = mongoose.model("categorys", CateGortSchema);

module.exports = CategoryModel;