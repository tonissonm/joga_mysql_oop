const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel{
    constructor(){
        super('article');
    }
    async findAll(
    ){
        const articles = await super.findAll();
        return articles;
    }
    async findOne(slug){
        const article = await super.findOne('slug',slug);
        return article;
    }
    async findMany(author){
        const articles = await super.findMany('author_id',author.id);
        return articles;
    }  
}
module.exports = ArticleModel; 