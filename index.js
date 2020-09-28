const path = require('path');
const gitserver = require('./js/git-server');
var express = require('express');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

let server = new gitserver.GitServer();
server.start(7005);

var app = express();

//For static ressources (vue.js)
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

//API reruest=
app.get('/repos', async function (req, res) {
    var result = server.getRepos((err, results) => {
        res.send(results);
    });
});

app.listen(7000);