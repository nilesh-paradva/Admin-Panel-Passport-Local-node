const express = require("express");
const routes = express.Router();
const HomeController = require("../controllers/HomeController.js");
const AuthMiddleware = require("../middleware/AuthMiddleware.js");
const AdminGet = require("../middleware/userGetmiddleware.js");

routes.get("/", AuthMiddleware.authMiddleware, AdminGet, HomeController.HomeController);
routes.get("/bcbutton", AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_buttonController);
routes.get("/bccollapse",  AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_collapse);
routes.get("/bcprogress",  AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_progress);
routes.get("/bctabs",  AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_tabs);
routes.get("/bctypography",  AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_typography);
routes.get("/bcbadges", AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_badges);
routes.get("/bcpagenation", AuthMiddleware.authMiddleware, AdminGet, HomeController.bc_pagenation);
routes.get("/samplepage", AuthMiddleware.authMiddleware, AdminGet, HomeController.samplepage);
routes.get("/mapgoogle", AuthMiddleware.authMiddleware, AdminGet, HomeController.mapgoogle);
routes.get("/formeelement", AuthMiddleware.authMiddleware, AdminGet, HomeController.formelement);
routes.get("/chart", AuthMiddleware.authMiddleware, AdminGet, HomeController.chart);
routes.get("/tbl", AuthMiddleware.authMiddleware, AdminGet, HomeController.tbl);

module.exports= routes