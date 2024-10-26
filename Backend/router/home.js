const path = require('path');
const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');
const usermiddlewarepage=require('../middlewares/usermiddleware.js');

router.get('/home',usermiddlewarepage.usermiddleware,homeController.getHome);

router.post('/login',homeController.postLogin);

router.post('/signup',homeController.postSignUp);

router.get('/:CompanyName',usermiddlewarepage.usermiddleware,homeController.getCompanyName);

router.get('/company/:CompanyName/:Typeofjob',usermiddlewarepage.usermiddleware,homeController.getCompanybyjob);

module.exports=router;
