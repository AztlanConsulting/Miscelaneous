const github = require('../utils/githubWebhook');
const mutex = require('../utils/mutex');

exports.atEvent = async (request, response) => {
    const gitData = request.body;

    // console.log(gitData);

    const discordWebhook = process.env.DOCUSAURUS_DISCORD_URL;

    const parsedGitData = github.parseData(gitData);

    // Deploy process
    if (parsedGitData.after != "0000000000000000000000000000000000000000") {
        mutex.deployDocusaurus(parsedGitData, discordWebhook);
    }

    response.status(200).json({message: parsedGitData.sender});
}