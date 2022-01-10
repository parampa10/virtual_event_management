const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const AbstractController = require('../controller/abstract');


router.post("/:id/submit",checkAuth,AbstractController.abs_submit);



module.exports=router;
