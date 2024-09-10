// setup db connection
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Imanoobganker1!',
    database: 'joga_mysql',
    multipleStatements: true
})

module.exports = db