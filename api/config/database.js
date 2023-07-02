const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit : 500,
    host : 'localhost',
    user :  'root',
    password: 'DbL0g!jhhWreegg!!!',
    database: 'lashDB'
})





