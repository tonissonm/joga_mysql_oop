const bcrypt = require("bcrypt");
const userDbModel = require('../models/user');
const userModel = new userDbModel();
const conn = require('../utils/db');
class userController{
    async LoginPage(req, res) {
      res.render('login')
  }

  async RegisterPage(req, res) {
      res.render('register');
  }
  async register(req,res){ 
      const checkUser = await userModel.findOne(req.body.username);
      console.log(checkUser);
      if(checkUser=== undefined|| checkUser.length === 0){
          
          console.log('Username is not in the database.');
          console.log(req.body.password);
          const cryptPassword = await bcrypt.hash(req.body.password,10);
          if(cryptPassword.length >= 60){
              const registeredId = await userModel.create({
                  username: req.body.username,
                  email: req.body.email,
                  password: cryptPassword
                  
              })
              const userData = await userModel.findById(req.body.username);
              if(registeredId){
                  req.session.user = {
                      username: registeredId[0], 
                      user_id: registeredId[1]
                  } 
              }
              res.status(400).render('register',{
                error: 'New user is registered',
                user_session: req.session.user
            })
          }
          else {
              return res.status(400).render('register',{error:"The password is too short."});
          }  
          
      }
      else{
          return res.status(400).render('register',{error:'Username is already in the database.'});

      }  
        
  }
  async login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    conn.query('SELECT * FROM user WHERE username = ?', [username],
    function(error, results, fields) {
      if (error) {
        res.status(500).render('login', {
          status: false,
          error: 'There is an error with the Query'
        });
      } else {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password,
          function(err, hashPwd) {
            if(err){
                return res.status(500).render('login', {
                    status: false,
                    error: 'Error comparing passwords.'
                })
            } 
            if (hashPwd) {
                req.session.user = {
                    username: results[0].username,
                    user_id: results[0].id  
                }
                console.log(req.session.user);
                return res.redirect('/');
                /* 
                return res.status(401).render('login', {
                    status: true,
                    error: "Successfully authenticated.", 
                    username: results[0].username,
                    id: results[0].id  
                });
                */
                

            } else {
              res.status(401).render('login', {
                status: false,
                error: "Username and password does not match."
              });
            }
          })
        } else {
          res.status(404).render('login', {
            status: false,
            error: "Username does not exist."
          });
        }
      }
    });
  }
}
module.exports = new userController(); 