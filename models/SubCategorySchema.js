const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    subcategory : {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    categoryId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorys",
        required: true
    }
})

const SubCatagoryModel = mongoose.model("subcategorys", SubCategorySchema);

module.exports = SubCatagoryModel ;