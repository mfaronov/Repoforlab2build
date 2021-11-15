const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'35.188.101.23',
    user: 'root',
    password:'123456',
    database:'awesome_database'
});

conn.connect();

conn.query(`Drop Table Product`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )
conn.query(`CREATE TABLE Product
            (
                Description varchar(100),
                Price   Dec(6,3),
                imgPath varchar(100)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
// {"desc":"Table","price":"200","imgPath":"/imgs/Table.jpg"}
conn.query( `insert into Product values ("Table",200,"/imgs/Table.jpg")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `insert into Product values ("Garbage",450,"/imgs/")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `select * from Product `
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                for (r of rows)
                    console.log(r);
            });

conn.end();
