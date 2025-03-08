const multer = require("multer");

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        if(file.fieldname === "blogImg"){
            cb(null, 'imgUpload/Blog')
        }else{
            cb(null, 'imgUpload/Profile')
        }
    },
    filename : function (req, file, cb){
        const fileName = Date.now() + "_" + Math.round(Math.random() * 1E9) + "_" + file.originalname ;
        cb(null, fileName)
    }
})
const upload = multer({storage});

module.exports = upload