/* Import node's http module: */
var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var storage = {results: []}; 
var objectId = 0;

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
});

app.use(express.static(__dirname + "/client"));
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

app.get('/cloudmouth', function(req, res) {
	res.send(storage);
})

app.post('/cloudmouth', function(req, res){
	req.body.objectId = ++objectId;
	req.body.createdAt = Date.now();
	storage.results.push(req.body);
	console.log(storage.results);
	res.send('got a POST request');
});