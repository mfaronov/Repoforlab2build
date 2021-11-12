const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'34.70.199.34',
        user: 'root',
        password:'mypassword',
        database:'MyStoreDB'
    });
    return conn;
}
module.exports = newConnection;