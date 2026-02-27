const mutex = require('async-mutex');
const discord = require('./discordWebhook'); 
const userData = require('./data');

const docusaurusLocks = [];

// Creation of the docusaurus mutex array
for (let i = 0; i < 3; i++) {
    docusaurusLocks[i] = new mutex.Mutex();
}

exports.deployDocusaurus = async (githubUser, discordWebhook) => {
    user = userData.getFromGithub(githubUser);

    await docusaurusLocks[Number(user.id)].runExclusive(async () => {
        // Inform that the deployment is starting

        let message = `<@${user.discord}>, el deploy de tu docusaurus está en proceso.\nEn breve te llegará otro mensaje diciéndote que está listo.`;

        await discord.sendWebhook(discordWebhook, message, user.discord);
    });
}

