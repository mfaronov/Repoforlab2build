const express = require('express');
//let productList = require('./products.json');
const newConnection = require('./DBConnection');

const app = express();

// serve static contents
app.use(express.static('static'));

var router = express.Router();
router.get('/Repoforlab2build', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from Product', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
});

// dynamic handling

app.get('/add-product', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Product values ('${req.query.desc}',${req.query.price},'${req.query.imgPath}')`
            ,(err,rows,fields) => {
                res.redirect('/products');        
            } );
    conn.end();
})

app.get('/prod-img', (request,response) =>{
    let content = '';
    let imgpath = request.query.path;
    let desc = request.query.desc;
    content += `<h1>${desc}</h1>`
    content += `<img src='${imgpath}'/>`
    response.send(content);
} )

app.get('/products', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let productList;
    conn.query(`select * from Product`, (err,rows,fields) => {

        if (err)
            response.send('ERROR: ' +err)
        else
        {
            productList = rows;

            let content ='';
            for (p of productList)
            {
                content += '<div>';
                content += p.Description + ":" + p.Price 
                content += ` <a href='/prod-img?path=${p.imgPath}&desc=${p.Description}'> See Image</a>`
                content += '</div>'
                content += '\n';
            }

            response.send(content);
        }
    })    

    conn.end();
})

app.listen(80);