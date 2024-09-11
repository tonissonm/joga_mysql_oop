const BaseSQLModel = require('./base');
class UserModel extends BaseSQLModel{
    constructor(){
        super('user');
    }
    async findById(id){
        const user = await super.findById(id);
        return user[0];
    }  
    async findOne(username){
        const user = await super.findOne('username',username);
        return user;
    }
    async create(user){
        const createdUserId = await super.create(user);
        return createdUserId;
    } 
        
}
module.exports = UserModel; 

