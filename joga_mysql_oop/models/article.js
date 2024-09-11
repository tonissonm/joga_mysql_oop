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
    async create(article){
        const createdArticleId = await super.create(article);
        return createdArticleId;
    }
    /*
    async update(article){
        const updatedArticleId = await super.update('article_id',article.id);
        return updatedArticleId;
    }
    */
    async update(article_id, article) {
        const updatedArticle = await super.update(article_id, article)
        return updatedArticle
      }    
}
module.exports = ArticleModel; 