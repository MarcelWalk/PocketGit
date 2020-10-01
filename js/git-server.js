const path = require('path');
const Server = require('node-git-server');
var ip = require('ip');
let repos;

class GitServer {

    constructor() {

    }

    start = function (n) {
        repos = new Server(path.resolve(__dirname, '../.repos'), {
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
                push.log(' |____|   \\____/ \\_____>__|__\\\\_____>__|    \\________/__||__|  ');
                push.log('');
            });

            push.accept();
        });

        repos.listen(port, () => {
            console.log(`node-git-server running at http://${ip.address()}:${port}`)
        });
    }

     getRepos(_callback) {
            repos.list(_callback);
    }
}

module.exports.GitServer = GitServer;