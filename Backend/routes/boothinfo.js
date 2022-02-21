const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const BoothController = require('../controller/boothinfo');

router.post("/create",BoothController.booth_create);
router.put("/update/:id",BoothController.booth_update);
router.delete("/delete/:id",BoothController.booth_delete);
router.get("/",BoothController.booth_get);
router.get("/:id",BoothController.booth_get_by_id);
router.get("/:name",BoothController.booth_get_by_name);

module.exports=router;
