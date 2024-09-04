const express = require('express');
const router = express.Router();
const articleControllerClass = require('../controllers/article');
const articleController = new articleControllerClass()
router.get('/',(req,res) => articleControllerClass.getAllArticles(req,res));
module.exports = router;
