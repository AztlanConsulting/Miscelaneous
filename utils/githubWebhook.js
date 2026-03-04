exports.parseData = (gitData) => {
    const isPr = gitData.pull_request != null;
    const isPush = gitData.pusher != null;

    const repository = gitData.repository.name;
    const cloneUrl = gitData.repository.clone_url;

    if (isPr && gitData.pull_request.state == 'open') {
        const baseBranch = gitData.pull_request.base.ref;
        const incomingBranch = gitData.pull_request.head.ref;
        const sender = gitData.pull_request.user.login;
        const latestBranch = incomingBranch;
        const headCommit = gitData.pull_request.head.sha;
        const after = gitData.after;

        return {
            message,
            repository,
            baseBranch,
            incomingBranch,
            latestBranch,
            sender,
            headCommit,
            cloneUrl,
            after
        }
    }

    const branch = gitData.ref.split("refs/heads/")[1];
    const latestBranch = branch;
    const sender = gitData.sender.login;
    const headCommit = gitData.head_commit.id;
    
    return {
        repository,
        branch,
        latestBranch,
        sender,
        headCommit,
        cloneUrl
    }
};