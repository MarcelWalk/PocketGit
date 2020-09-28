const path = require('path');
const gitserver = require('./js/git-server');
var rimraf = require("rimraf");
var express = require('express');
var ip = require('ip');

let server = new gitserver.GitServer();
server.start(7005);

var app = express();

//For static ressources (vue.js)
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html/index.html'));
});

//API reruests
app.get('/api/repos', async function (req, res) {
    var result = server.getRepos((err, results) => {
        res.send(results);
    });
});

app.get('/api/delete', function(req, res) {
    var repoName = req.query.repoName;
    console.log(repoName);
    console.log(path.resolve(__dirname, '.repos/' + repoName));
    rimraf.sync(path.resolve(__dirname, '.repos/' + repoName));
    res.redirect('/')
});

app.listen(7000);