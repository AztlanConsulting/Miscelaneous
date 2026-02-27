exports.parseData = (gitData) => {
    const isPr = gitData.pull_request != null;
    const isPush = gitData.pusher != null;

    const repository = gitData.repository.name;

    if (isPr && gitData.pull_request.state == 'open') {
        const baseBranch = gitData.pull_request.base.ref;
        const incomingBranch = gitData.pull_request.head.ref;
        const sender = gitData.pull_request.user.login;

        return {
            message,
            repository,
            baseBranch,
            incomingBranch,
            sender
        }
    }

    const branch = gitData.ref.split("/")[2];
    const sender = gitData.sender.login;
    
    return {
        repository,
        branch,
        sender
    }
};