const mutex = require('async-mutex');
const userData = require('./data');
const deploy = require('./docusaurusDeployment');
require("dotenv").config();

const docusaurusLocks = [];

exports.createDocusaurusMutexArray = (n) => {
    for (let i = 0; i <= n; i++) {
        docusaurusLocks[i] = new mutex.Mutex();
    }
}

exports.deployDocusaurus = async (parsedGitData, discordWebhook) => {
    user = userData.getFromGithub(parsedGitData.sender);

    if (parsedGitData.latestBranch == process.env.DOCUSAURUS_DEVELOP_BRANCH) {
        deployDevelop(parsedGitData);
    }

    await docusaurusLocks[Number(user.id)].runExclusive(async () => {
        await deploy.process(user, parsedGitData, discordWebhook, user.school);
    });
}

async function deployDevelop(parsedGitData) {
    await docusaurusLocks[0].runExclusive(async () => {
        await deploy.process(null, parsedGitData, '', process.env.DOCUSAURUS_DEVELOP_BRANCH);
    });
}