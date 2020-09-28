const path = require('path');
const Server = require('node-git-server');
let repos;

class GitServer {

    constructor() {
       
    }

    start = function(n) {
        repos = new Server(path.resolve(__dirname, '.repos'), {
            autoCreate: true
        });
        const port = process.env.PORT || n;

        repos.on('push', (push) => {
            console.log(`push ${push.repo}/${push.commit} (${push.branch})`);
            
                        repos.list((err, results) => {
                            push.log(' ');
                            push.log('Hey!');
                            push.log('Checkout these other repos:');
                            for (const repo of results) {
                                push.log(`- ${repo}`);
                            }
                            push.log(' ');
                        });
            
            push.accept();
        });

        repos.listen(port, () => {
            console.log(`node-git-server running at http://localhost:${port}`)
        });
    }

    getRepos = function() {
        return Array.from(repos.list);
    }
}

module.exports.GitServer = GitServer;