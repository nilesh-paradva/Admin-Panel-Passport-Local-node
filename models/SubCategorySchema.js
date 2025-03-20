const moongose = require("mongoose");

const SubCategorySchema = new moongose.Schema({
    subcategory : {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    categoryId :{
        type: moongose.Schema.ObjectId,
        ref: "categorys",
        required: true
    }
})

const SubCatagoryModel = moongose.model("subcategorys", SubCategorySchema);

module.exports = SubCatagoryModel ;