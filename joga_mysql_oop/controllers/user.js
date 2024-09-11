const bcrypt = require("bcrypt");
const userDbModel = require('../models/user');
const userModel = new userDbModel();
class userController{
    async register(req,res){ 
        const checkUser = await userModel.findOne(req.body.username);
        console.log(checkUser);
        if(checkUser=== undefined|| checkUser.length === 0){
            console.log('Username is not in the database.');
            console.log(req.body.password);
            const cryptPassword = await bcrypt.hash(req.body.password,10);
            if(cryptPassword.length >= 72){
                const registeredId = await userModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: cryptPassword
                    
                })
                const userData = await userModel.findById(req.body.username);
                if(registeredId){
                    req.session.user = {
                        username: userData.username, 
                        user_id: userData.id
                    } 
                }
                res.json({
                    message: 'New user is registered',
                    user_session: req.session.user
                })
            }
            else {
                return res.status(400).json({message:"The password is too short."});
            }  
            
        }
        else{
            return res.status(400).json({message:'Username is already in the database.'});

        }  
         
    } 
    

}
module.exports = new userController(); 