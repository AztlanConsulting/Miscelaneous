const discord = require('../utils/discordWebhook');

exports.atPullRequest = async (request, response) => {
    const gitData = request.body;

    console.log(gitData);

    const isPr = gitData.pull_request != null;
    const isPush = gitData.pusher != null;

    let message = '';
    let webhookUrl = '';

    const repository = gitData.repository.name;

    if (isPr && gitData.pull_request.state == 'open') {
        const baseBranch = gitData.pull_request.base.ref;
        const incomingBranch = gitData.pull_request.head.ref;
        const sender = gitData.pull_request.user.login;
        message = `Se hizo un PR; lo hizo ${sender}, de ${baseBranch} a ${incomingBranch}`;
    } else if (isPush) {
        const branch = gitData.ref.split("/")[2];
        const sender = gitData.sender.login;
        message = `${sender} pusheó a ${branch}`;
    }

    await discord.sendWebhook(webhookUrl, message);

    response.status(200).json({message: 'We on docusaurus'});
}