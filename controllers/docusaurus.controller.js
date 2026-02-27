const github = require('../utils/githubWebhook');
const mutex = require('../utils/mutex');

exports.atEvent = async (request, response) => {
    const gitData = request.body;

    // console.log(gitData);

    const discordWebhook = '';

    const parsedGitData = github.parseData(gitData);

    // Deploy process
    mutex.deployDocusaurus(parsedGitData, discordWebhook);

    response.status(200).json({message: parsedGitData.sender});
}