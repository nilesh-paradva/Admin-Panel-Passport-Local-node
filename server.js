const express = require("express");
const session = require("express-session");
const passport = require("passport"); 
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./db/db.js");
const flash = require("connect-flash")

const SimpleHomeRoute = require("./routes/HomePageRoute.js");
const AuthRoutes = require("./routes/AuthRoute.js");
const ProfileRoute = require("./routes/ProfileRoute");
const BlogRoute = require("./routes/BlogRoute.js");
const categoryRoute = require("./routes/CategoryRoute.js");
const SubCategoryRoute = require("./routes/SubCategoryRoute.js");

const app = express();
const port = 8005;

app.set('view engine', 'ejs');

app.use(session({
    secret: 'Auth',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 1000 * 60 * 60 * 24 }
}));
 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.set('pages', path.join(__dirname, 'pages'));
app.use(express.static(path.join(__dirname, 'views/pages')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ImgUpload', express.static(path.join(__dirname, 'ImgUpload')));

app.use("/", AuthRoutes, SimpleHomeRoute, ProfileRoute, BlogRoute, categoryRoute, SubCategoryRoute);

app.listen(port, (err) => {
    if (!err) console.log(`Server started at http://localhost:${port}`);
});