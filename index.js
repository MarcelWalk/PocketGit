const path = require('path');
const gitserver = require('./js/git-server');
const Git = require("nodegit");
const rimraf = require("rimraf");
const express = require('express');
const ip = require('ip');
const url = require('url');
var showdown  = require('showdown');

let server = new gitserver.GitServer();
server.start(7005);

var app = express();

//For static ressources (vue.js)
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html/index.html'));
});
app.get('/repository', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'html/repository.html'));
});

//API reruests
app.get('/api/readme', async function (req, res) {
    const repoName = req.query.repo;
    if (repoName) {

        var result = server.getRepos((err, results) => {
            try {
                var getMostRecentCommit = function (repository) {
                    return repository.getBranchCommit("master");
                };
                Git.Repository.open(path.resolve(__dirname + "/.repos/" + repoName))
                    .then(getMostRecentCommit)
                    .then(function (commit) {
                        return commit.getEntry("README.md");
                    })
                    .then(function (entry) {
                        _entry = entry;
                        return _entry.getBlob();
                    })
                    .then(function (blob) {
                        var firstTenLines = blob.toString().split("\n").join("\n");

                        converter = new showdown.Converter(),
                        
                        res.send(converter.makeHtml(firstTenLines));
                    }).catch(err => console.log(err))
            } catch (err) {
                console.log("Tree doesnt contain README");
            }
        });
    }
});

app.get('/api/repos', async function (req, res) {
    var result = server.getRepos((err, results) => {
        res.send(results);
    });
});

app.get('/api/delete', function (req, res) {
    var repoName = req.query.repoName;

    if (repoName !== "") {
        rimraf.sync(path.resolve(__dirname, '.repos/' + repoName));
    }
    res.redirect('/')

});

app.listen(7000);