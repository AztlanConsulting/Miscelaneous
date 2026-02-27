const mutex = require('async-mutex');
const discord = require('./discordWebhook'); 
const userData = require('./data');
const path = require("path"); 

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const docusaurusLocks = [];

// Creation of the docusaurus mutex array
for (let i = 0; i < 3; i++) {
    docusaurusLocks[i] = new mutex.Mutex();
}

exports.deployDocusaurus = async (parsedGitData, discordWebhook) => {
    user = userData.getFromGithub(parsedGitData.sender);

    await docusaurusLocks[Number(user.id)].runExclusive(async () => {
        // Inform that the deployment is starting
        let message = `<@${user.discord}>, el deploy de tu docusaurus está en proceso.\nEn breve te llegará otro mensaje diciéndote que está listo.`;

        await discord.sendWebhook(discordWebhook, message, user.discord);

        const script = `${path.join(__dirname, '../scripts/deployDocusaurus.sh')} ${user.school} ${path.join(__dirname, '../repos')} ${path.join(__dirname, '../builds')} ${parsedGitData.cloneUrl} ${parsedGitData.headCommit}`;

        // Make the deployment
        try {
            await execAsync(`bash ${script}`);
        } catch (err) {
            const message = `<@${user.discord}>, el deploy de tu docusaurus falló.\nRevisa que no tenga errores y vuelve a intentar.`;

            await discord.sendWebhook(discordWebhook, message, user.discord);

            throw err;
        }

        // Inform that the deployment ended
        message = `<@${user.discord}>, el deploy de tu docusaurus acaba de terminar!.\nPuedes acceder a éste a través de X.`;

        await discord.sendWebhook(discordWebhook, message, user.discord);
    });
}

