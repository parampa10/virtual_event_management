const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const BoothController = require('../controller/boothinfo');

router.post("/create",checkAuth, checkAdmin,BoothController.booth_create);
router.put("/update/:id",checkAuth, checkAdmin,BoothController.booth_update);
router.post("/delete/:id",checkAuth, checkAdmin,BoothController.booth_delete);
router.get("/",checkAuth,BoothController.booth_get);
router.get("/:id",checkAuth,checkAdmin,BoothController.booth_get_by_id);
router.get("/:name",checkAuth,BoothController.booth_get_by_name);

module.exports=router;
