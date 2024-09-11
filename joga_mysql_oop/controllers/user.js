const bcrypt = require("bcrypt");
const userDbModel = require('../models/user');
const userModel = new userDbModel();
const conn = require('../utils/db');
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
    async login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        conn.query('SELECT * FROM user WHERE username = ?', [username],
        function(error, results, fields) {
          if (error) {
            res.status(500).json({
              status: false,
              message: 'There is an error with the Query'
            });
          } else {
            if (results.length > 0) {
              bcrypt.compare(password, results[0].password,
              function(err, hashPwd) {
                if(err){
                    return res.status(500).json({
                        status: false,
                        message: 'Error comparing passwords.'
                    })
                } 
                if (hashPwd) {
                    req.session.user = {
                        username: results[0].username,
                        user_id: results[0].id  
                    } 
                    res.status(401).json({
                        status: true,
                        message: "Successfully authenticated."

                    });

                } else {
                  res.status(401).json({
                    status: false,
                    message: "Username and password does not match."
                  });
                }
              })
            } else {
              res.status(404).json({
                status: false,
                message: "Username does not exist."
              });
            }
          }
        });
    }
}
module.exports = new userController(); 