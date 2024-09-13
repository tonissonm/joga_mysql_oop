const ArticleDbModel =require('../../models/article');
const ArticleController = require('../article');
const articleModel = new ArticleDbModel();

class articleAdminController extends ArticleController{
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
        const id = parseInt(req.params.id); 
        console.log('Received ID:', id); 
        console.log('Request Body:', req.body);
        const updatableArticle={
            name: req.body.name,
            slug: req.body.slug, 
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0,19).replace('T',' '),
            author_id: req.body.author_id
        }
        
        const result = await articleModel.update(id,updatableArticle);
        res.status(201).json({
            message:`Updated article with ID: ${id}`,
            article: {id:id, ...updatableArticle}   
        }); 
    }
    async deleteArticle(req,res){
        const id = req.body.id;
        console.log(id);
        const result = await articleModel.delete(id);
        res.status(200).json({
            message:`Deleted article with ID: ${id}`,
            article: {id:id}
        }); 
    }    
}
module.exports = new articleAdminController(); 