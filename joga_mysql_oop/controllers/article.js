const ArticleDbModel = require('../models/article')
const articleModel = new ArticleDbModel();

class articleController{
    constructor(){
        const articles = []; 
    }
    async getAllArticles(req,res){
        const articles = await articleModel.findAll();
        res.status(201).json({articles:articles});
    }
    async getArticleBySlug(req,res){
        const article = await articleModel.findOne(req.params.slug);
        res.status(201).json({article: article});
    }
    async createNewArticle(req,res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug, 
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0,19).replace('T',' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({
            message: `Created article with ID: ${articleId}`,
            article: {id:articleId, ...newArticle} 
        }) 
    }
    async updateArticle(req,res){
        const updatableArticle={
            name: req.body.name,
            slug: req.body.slug, 
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0,19).replace('T',' '),
            author_id: req.body.author_id,
        }

        const articleId = await articleModel.update(updatableArticle);
        res.status(201).json({
            message:`Updated article with ID: ${articleId}`,
            article: {id:articleId, ...updatableArticle}   
        }) 
    }  
} 
module.exports = new articleController();