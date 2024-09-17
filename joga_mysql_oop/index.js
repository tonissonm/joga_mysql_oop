//application packages
//const conn = require('../utils/db');
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layout/'
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false} ));
app.use(bodyParser.json());
app.use(sessions({
    secret:"thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxage:1000 * 60 * 60 * 24},
    resave: false   
}));
/*
app.get('/',(req,res)=>{
    let query = "SELECT * FROM article";
    let articles =[];
    conn.query(query,(err,result)=>{
        if(err) throw err;
        articles = result;
        
    }) 
});
*/
const authorRoutes = require('./routes/authors');
const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

app.use('/',authorRoutes);
app.use('/', articleRoutes);
app.use('/',userRoutes);
app.use('/',adminRoutes);
//
app.listen(3026, ()=>{
    console.log('App is started at http://localhost:3026')
});