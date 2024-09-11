//application packages
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false} ));
app.use(bodyParser.json());
app.use(sessions({
    secret:"thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxage:1000 * 60 * 60 * 24},
    resave: false   
}))
const authorRoutes = require('./routes/authors');
const articleRoutes = require('./routes/articles');
app.use('/',authorRoutes);
app.use('/', articleRoutes);
const userRoutes = require('./routes/users');
app.use('/',userRoutes);
//
app.listen(3026, ()=>{
    console.log('App is started at http://localhost:3026')
});