/* Import node's http module: */
var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var storage = {results: []}; 
var objectId = 0;

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
});

app.use(express.static(__dirname + "/client"));
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

app.get('/cloud-mouth', function(req, res) {
	res.send(storage);
});

app.post('/cloud-mouth', function(req, res){
	req.body.objectId = ++objectId;
	req.body.createdAt = Date.now();
	storage.results.unshift(req.body);
	res.send('got a POST request');
});
