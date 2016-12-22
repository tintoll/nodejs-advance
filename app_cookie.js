/**
 * Created by tinoll on 2016. 12. 20..
 */


var express = require('express');
var cookieParser = require('cookie-parser');    //쿠키를 사용하기 위해 필요함
var app = express();
app.use(cookieParser('117722'));  // 쿠키를 암호하할려면 키값을 넣어준다


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

app.get('/cart/:id',function (req,res) {

    var id = req.params.id;

    var cart;
    if(req.signedCookies.cart) {
        cart = req.signedCookies.cart;
    } else {
        cart =  {};
    }
    if(!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart',cart,{signed:true});
    //res.send(cart);
    res.redirect('/cart')
});

app.get('/cart',function (req,res) {

    var cart = req.signedCookies.cart;
    if(!cart) {
        res.send('Empty');
    } else {
        var output = '';
        for(var id in cart) {
            output += `<li>${products[id].title}(${cart[id]})</li>`;
        }
    }
    res.send(`
            <h1>Cart</h1>
            <ul>${output}</ul> 
            <a href="/products">Products List</a>`);
});

app.get('/count',function (req,res) {
    var count = 0;
    /*
    if(req.cookies.count) {
        count = parseInt(req.cookies.count);
    }
    */
    // 암호화하였을 경우에는 아래와 같이 signedCookies를 사용합니다
    if(req.signedCookies.count) {
        count = parseInt(req.signedCookies.count);
    }

    res.cookie('count', count+1,{signed : true});  //쿠키를 응답에 보내줍니다, {signed : true}옵션을 주어야 암호화 된다
    res.send('Count : '+count);
});


app.listen(3003,function () {
    console.log('Connected 3003 port!!');
});