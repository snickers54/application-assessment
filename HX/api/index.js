var express = require('express');
var app = express();
var bodyParser = require("body-parser");
// connecting to mongodb
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
mongoose.connect('mongodb://'+ process.env.DB_PORT_27017_TCP_ADDR +'/hx', options);
// getting this current connection
var db = mongoose.connection;
// checking any error on it
db.on('error', function(err) {
    console.error(err);
});
// we did it !
db.once('open', function() {

    // config about getting data from body, either in json or urlencoded
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // we require our user and pass ou connection to mongodb
    var user = require('./user.js')(mongoose);
    // user routes :
    app.get('/user/:id', user.get);
    app.post('/user', user.post);
    app.delete('/user/:id', user.delete);
    app.put('/user/:id', user.put);

    // I defined the first route to let you see it's working
    app.get('/', function (req, res) {
      res.json({text:"Welcome to my Application test for HX"});
    });

    // listen
    app.listen(4242, function () {
        console.log("Server is listening :)");
    });
});
