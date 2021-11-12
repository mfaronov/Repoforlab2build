const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'35.188.101.23',
        user: 'root',
        password:'123456',
        database:'awesome_database'
    });
    return conn;
}
module.exports = newConnection;