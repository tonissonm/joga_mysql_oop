const ArticleDbModel = require('../models/article')
const ArticleModel = new ArticleDbModel();

class articleController{
    constructor(){
        const articles = []; 
    }
    async getAllArticles(req,res){
        const articles = await ArticleModel.findAll();
        res.status(201).json({articles:articles});
    }
    async getArticleBySlug(req,res){
        const article = await ArticleModel.findOne(req.params.slug);
        res.status(201).json({article: article});
    } 
} 
module.exports = articleController;