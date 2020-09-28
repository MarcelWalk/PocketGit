const path = require('path');
const Server = require('node-git-server');
let repos;

class GitServer {

    constructor() {

    }

    start = function (n) {
        repos = new Server(path.resolve(__dirname, '.repos'), {
            autoCreate: true
        });
        const port = process.env.PORT || n;

        repos.on('push', (push) => {
            console.log(`push ${push.repo}/${push.commit} (${push.branch})`);

            repos.list((err, results) => {
                push.log('__________              __           __      ________.__  __   ');
                push.log('\\______   \\____   ____ |  | __ _____/  |_   /  _____/|__|/  |_ ');
                push.log(' |     ___/  _ \\_/ ___\\|  |/ // __ \\   __\\ /   \\  ___|  \\   __\\');
                push.log(' |    |  (  <_> )  \\___|    <\\  ___/|  |   \\    \\_\\  \\  ||  |  ');
                push.log(' |____|   \\____/ \\___  >__|_ \\\\___  >__|    \\______  /__||__|  ');
                push.log('                     \\/     \\/    \\/               \\/          ');
            });

            push.accept();
        });

        repos.listen(port, () => {
            console.log(`node-git-server running at http://localhost:${port}`)
        });
    }

    getRepos(){
        repos.list((err, results) => {
            console.log("1");
            return results
        });
    }
}

module.exports.GitServer = GitServer;