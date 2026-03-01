const discord = require('./discordWebhook'); 
const path = require("path"); 

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

function startMessage(user) {
    return `<@${user.discord}>, el deploy de tu docusaurus está en proceso.\nEn breve te llegará otro mensaje diciéndote que está listo.`;
}

function errorMessage(user) {
    return `<@${user.discord}>, el deploy de tu docusaurus falló.\nRevisa que no tenga errores y vuelve a intentar.`;
}

function successMessage(user) {
    return `<@${user.discord}>, el deploy de tu docusaurus acaba de terminar!\nPuedes acceder a éste a través de ${process.env.BASE_DOCUSAURUS}/${user.school} o de http://${process.env.BASE_DOCUSAURUS_LOCAL}/${user.school} / .`;
}

exports.process = async (user, parsedGitData, discordWebhook, directory) => {
    // Inform that the deployment is starting
    if (user !== null) {
        await discord.sendWebhook(discordWebhook, startMessage(user), user.discord);
    }

    const bashFile = path.join(__dirname, '../scripts/deployDocusaurus.sh');
    const reposAddress = path.join(__dirname, '../repos');
    const buildsAddress = path.join(__dirname, '../builds');

    const script = `${bashFile} ${directory} ${reposAddress} ${buildsAddress} ${parsedGitData.cloneUrl} ${parsedGitData.headCommit} ${parsedGitData.repository}`;

    // Make the deployment
    try {
        await execAsync(`bash ${script}`);
    } catch (err) {
        // Inform there was an error with the deployment
        if (user !== null) {
            await discord.sendWebhook(discordWebhook, errorMessage(user), user.discord);
        }

        throw err;
    }

    // Inform that the deployment ended
    if (user !== null) {
        await discord.sendWebhook(discordWebhook, successMessage(user), user.discord);
    }
}