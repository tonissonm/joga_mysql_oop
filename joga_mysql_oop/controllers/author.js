const AuthorDbModel = require('../models/author');
const ArticleDbModel = require('../models/article');
const authorModel = new AuthorDbModel();
const articleModel = new ArticleDbModel();

class authorController{
    constructor(){
        const authors = []; 
    }
    async getAuthorById(req,res){
        const author = await authorModel.findById(req.params.id);
        const articles = await articleModel.findMany(author);
        author['articles'] = articles;
        res.status(201).json({author:author});
    }
    
} 
module.exports = new authorController();