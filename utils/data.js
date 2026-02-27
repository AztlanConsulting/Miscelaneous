const path = require("path"); 
const fs = require('node:fs');

const idMap = new Map();
const githubMap = new Map();
const schoolMap = new Map();

// Id, GithubId, DiscordId

// Read data from file
fs.readFile(path.join(__dirname, '../users.txt'), 'utf8', (err, data) => {
    const users = data.split('\n');
    for (user of users) {
        const attributes = user.split(' ');
        const id = attributes[0];
        const github = attributes[1];
        const discord = attributes[2];
        const school = attributes[3];

        const structure = {
            id,
            github,
            discord,
            school
        }

        idMap.set(id, structure);
        githubMap.set(github, structure);
        schoolMap.set(schoolMap, structure);
    }
});

exports.getFromId = (id) => {
    return idMap.get(id);
}

exports.getFromGithub = (id) => {
    return githubMap.get(id);
}

exports.getFromSchool = (id) => {
    return schoolMap.get(id);
}