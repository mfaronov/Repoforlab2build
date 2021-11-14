const express = require('express');
let productList = require('./products.json');

const app = express();

// serve static contents
app.use(express.static('static'));

// dynamic handling

app.get('/prod-img', (request,response) =>{
    let content = '';
    let imgpath = request.query.path;
    let desc = request.query.desc;
    content += `<h1>${desc}</h1>`
    content += `<img src='${imgpath}'/>`
    response.send(content);
} )

app.get('/products', (request, response) => {
    let content ='';
    for (p of productList)
    {
        content += '<div>';
        content += p.desc + ":" + p.price 
        content += ` <a href='/prod-img?path=${p.imgPath}&desc=${p.desc}'> See Image</a>`
        content += '</div>'
        content += '\n';
    }

    response.send(content);
})

app.listen(80);