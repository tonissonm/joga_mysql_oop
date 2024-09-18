const express = require("express");
const app = express();

const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3026/joga_sequelize');
sequelize
    .authenticate()
    .then(()=>{
    console.log('Connected to the database.');
    })
    .catch(err =>{
        console.error('Unable to connect to the database: ',err);
    });


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({ message: " Welcome to sequelize application"});
});

app.listen(3026, ()=> {
    console.log("Swerver is running on http://localhost:3026");
});