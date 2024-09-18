const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({ message: " Welcome to sequelize application"});
});

app.listen(3026, ()=> {
    console.log("Swerver is running on http://localhost:3026");
});