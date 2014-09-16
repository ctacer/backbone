
var http = require('http');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var express = require('express');
var restler = require('restler');

var apiUrl = 'http://192.168.10.169';
var app = express();
var server = http.createServer(app);

// app environments
app.set('port', 8000);
app.set('views', __dirname + '/app');

//app midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'app')));

var restlerMethod = {
  'GET': 'get',
  'POST': 'post',
  'PUT': 'put',
  'DELETE': 'del'
};

app.all('/api/*', function (req, res) {
  var options = {};
  if (req.body) {
    options.data = req.body;
  }
  else if (req.query) {
    options.data = req.query; 
  }

  restler[restlerMethod[req.method]] (apiUrl + req.url, options).on('complete', function (data) {
    res.json(data)
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});