const model = require("../models/AdminSchema");
const fs = require("fs");
const bcrypt = require("bcrypt")

const profile = async (req, res) => { res.render("pages/profile") }

const profileEdit = async (req, res) => {

    await model.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/profile");
};

const profileImg = async (req, res) => {
    try {
        if (!req.file) return console.log("No file uploaded.")
        const user = await model.findById(req.params.id);
        if (!user) return console.log("User not found.");

        (user.avatar) ? fs.unlinkSync(`${user.avatar}`) : console.error("not delete old image:");
        await model.findByIdAndUpdate(req.params.id, { avatar: req.file.path }, { new: true });

        res.redirect("/profile");
    } catch (err) {
        console.error("Error uploading image:", err);
    }
};

const PassChange = (req, res) => {
    const { OldPass, NewPass, ConfPass } = req.body

    if (NewPass === ConfPass) {
        bcrypt.compare(OldPass, req.user.password, async (err, pass) => {
            if (!err && pass) {
                bcrypt.hash(NewPass, 10, async (err, passHash) => {
                    if (!err && passHash) {
                        await model.findByIdAndUpdate(req.params.id, { password: passHash }, req.body);
                        res.redirect("/profile");
                    } else {
                        console.log("pass word in not hash");
                    }
                })
            } else {
                console.log("password not match");
            }
        })
    } else {
        console.log("old and new password not match");
    }
}

const profileImgDelete = async (req, res) => {
    try {
        const profileImg = await model.findById(req.params.id);

        if (profileImg && profileImg.avatar) {
            fs.unlinkSync(profileImg.avatar);
            profileImg.avatar = null;
            await profileImg.save();
        }

        res.redirect("/profile");
    } catch (error) {
        console.error("Error delete profile image:", error);
    }
};

module.exports = { profile, profileEdit, profileImg, profileImgDelete, PassChange }