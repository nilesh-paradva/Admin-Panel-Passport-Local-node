const AdminModel = require("../models/AdminSchema");
const bcrypt = require("bcrypt");
const generateUniqueId = require('generate-unique-id');
const nodemailer = require("nodemailer");

const authsignin = (req, res) => (res.render("pages/authsignin"));
const authLogin = async (req, res) => {
    req.flash("login", `Login successful ! Welcome, ${req.user.username}`);
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

const forgotPassword = (req,res) => (res.render("pages/forgotpassword"));

const OtpGenerate = async (req, res) => {

    const admin = await AdminModel.findOne({email : req.body.email});
    if(admin){
        const otp = generateUniqueId({
            length: 4,
            useLetters: false
        });

        console.log("OTP", otp);

        await AdminModel.findByIdAndUpdate(admin._id, {otp : otp});

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 465,
            auth: {
              user: 'nileshparadva97@gmail.com',
              pass: 'npezkdzpojetijjr',
            },
        });

        const mailOptions = {
            from: 'nileshparadva97@gmail.com',
            to: admin.email,
            subject: 'OTP Verification - Please Use This Code',
            text: `Your OTP for account verification is: ${otp}`,
            html: `<p>Your OTP for account verification is: <strong>${otp}</strong></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.render("pages/otpVarify", {admin});
    }
}

const verifyOtp = async (req,res)=> {
    const {id, otp} = req.body;
    const admin =  await AdminModel.findOne({_id:id});
    if(admin.otp === otp) res.render("pages/ResetPassword", {admin}) ;
}

const ResetPassword = async (req, res) => {
    const {id, newPassword, confirmPassword} = req.body
    if(newPassword === confirmPassword){
        bcrypt.hash(newPassword, 12, async (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Error hashing password" });

            await AdminModel.findByIdAndUpdate(id, {password : hashedPassword, otp : null})
            res.redirect("/authsignin");
        });
    }else{
        console.log("password not forgot");
    }
}

module.exports = {authsignin, authLogin, SignOut, authsignup, register, forgotPassword, OtpGenerate, verifyOtp, ResetPassword}