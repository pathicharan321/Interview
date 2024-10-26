const path = require('path');
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const adminmiddlewarepath=require('../middlewares/adminmiddleware');

router.post('/login',adminController.postLogin);
router.post('/signup',adminController.postSignUp);
router.post('/Submitform',adminmiddlewarepath.adminmiddleware,adminController.postSubmitform);


router.get('/previousUpload',adminmiddlewarepath.adminmiddleware,adminController.getpreviousUpload);

router.get('/Update/:id',adminmiddlewarepath.adminmiddleware,adminController.getUpdate);

router.put('/Update/:id',adminmiddlewarepath.adminmiddleware,adminController.putUpdate);

module.exports=router;