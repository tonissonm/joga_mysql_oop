const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/user/register',(req,res) => userController.register(req,res));
router.post('/user/login',(req,res)=> userController.login(req,res));
router.get('/user/login', (req, res) => userController.LoginPage(req, res));
router.get('/user/register', (req, res) => userController.RegisterPage(req, res));
router.get('/user/logout',(req,res)=> userController.logout(req,res));
module.exports = router;
