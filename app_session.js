
var express = require('express');

var session = require('express-session');  //세션을 사용하기 위해 선언

var app = express();


//secret가 키값임
app.use(session({
    secret: '1112222333',
    resave: false,
    saveUninitialized: true
}))


app.get('/count',function (req,res) {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }

    res.send('Hi Sesstion Count : '+req.session.count);
});


app.listen(3003,function () {
    console.log('Connected 3003 port!!');
}); 