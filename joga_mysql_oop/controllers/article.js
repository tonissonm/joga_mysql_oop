const ArticleDbModel = require('../models/article')
const ArticleModel = new ArticleDbModel();

class articleController{
    constructor(){
        const articles = []; 
    }
    async getAllArticles(req,res){
        const articles = await ArticleModel.findAll();
        res.status(201).json({articles:articles})
    } 
} 
module.exports = articleController;