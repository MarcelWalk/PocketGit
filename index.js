const path = require('path');
const gitserver = require('./git-server');
var express = require('express');

let server = new gitserver.GitServer();
server.start(7005);

var app = express();
app.use(express.static(__dirname));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/repos', function (req, res) {
    res.send(server.getRepos());
});

app.listen(7000);