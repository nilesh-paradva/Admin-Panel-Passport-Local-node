const AdminModel = require("../models/AdminSchema");
const bcrypt = require("bcrypt");

const authsignin = (req, res) => (res.render("pages/authsignin"));
const authLogin = async (req, res) => {
    req.flash("login", "login sucess");
    res.redirect("/")
};
const SignOut = (req, res, next) => req.logout((err) => (err) ? next(err) : res.redirect('/authsignin'));
const authsignup = (req, res) => (res.render("pages/authsignup"))

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return console.log("username, email, and password require");
        if (await AdminModel.findOne({ email })) return console.log("User already registered");
        bcrypt.hash(password, 12, async (err, PassHash) => {
            if (!err) {
                const newUser = new AdminModel({
                    username,
                    email,
                    password: PassHash,
                });

                await newUser.save();
                res.redirect("/authsignin");
            }
        })

    } catch (err) {
        console.log("Signup error:", err);
    }
};

module.exports = {authsignin, authLogin, SignOut, authsignup, register}