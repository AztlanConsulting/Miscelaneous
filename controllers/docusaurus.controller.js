const discord = require('../utils/discordWebhook');

exports.atPullRequest = async (request, response) => {
    const gitData = request.body;

    console.log(gitData);

    const isPr = gitData.pullRequest != null;
    const isPush = gitData.pusher != null;

    const repository = gitData.repository.name;
    const branch = gitData.ref.split("/")[2];
    const sender = gitData.sender.login;

    const message = "";

    const webhookUrl = "";

    await discord.sendWebhook(webhookUrl, message);

    response.status(200).json({message: 'We on docusaurus'});
}