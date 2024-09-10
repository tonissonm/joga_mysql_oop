//application packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false} ));
app.use(bodyParser.json());

const authorRoutes = require('./routes/authors');
const articleRoutes = require('./routes/articles');
app.use('/',authorRoutes);
app.use('/', articleRoutes);


//
app.listen(3026, ()=>{
    console.log('App is started at http://localhost:3026')
});