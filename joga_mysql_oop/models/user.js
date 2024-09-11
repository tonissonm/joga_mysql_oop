const BaseSQLModel = require('./base');
class UserModel extends BaseSQLModel{
    constructor(){
        super('user');
    }
    async create(user){
        const createdUserId = await super.create(user);
        return createdUserId;
    } 
        
}
module.exports = UserModel; 

