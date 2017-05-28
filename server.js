// Require our dependencies
var express = require('express');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use('/public/', express.static(__dirname + "/public/"));

app.use('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html', function (err) {});
});

// Fire this bitch up (start our server)
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + server.address().port);
});
// server.timeout = 1000;