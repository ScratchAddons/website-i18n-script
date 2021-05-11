const exec = require('child_process').exec

exec('tx push --source --use-git-timestamps --skip', (err, stdout, stderr) => console.log(stdout))