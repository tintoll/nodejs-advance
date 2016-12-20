/**
 * Created by tinoll on 2016. 12. 20..
 */


var express = require('express');
var cookieParser = require('cookie-parser');    //쿠키를 사용하기 위해 필요함
var app = express();
app.use(cookieParser());


var products = {
    1:{title : 'The history web 1'},
    2:{title : 'The next web'}
}
app.get('/products',function (req,res) {
    var output = '';
    for(var i in products) {
        output += `<li>
                       <a href="/cart/${i}"> ${products[i].title} </a>
                   </li>`;
    }

    res.send(`<h1>Products</h1><ul>${output}</ul> <a href="/cart">Cart</a> `);
});

app.get('/count',function (req,res) {
    var count = 0;
    if(req.cookies.count) {
        count = parseInt(req.cookies.count);
    }
    res.cookie('count', count+1);  //쿠키를 응답에 보내줍니다
    res.send('Count : '+count);
});


app.listen(3003,function () {
    console.log('Connected 3003 port!!');
});