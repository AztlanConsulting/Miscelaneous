const path = require('path');
const userData = require('./data');

exports.build = async () => {
    const baseBuildsDir = path.join(__dirname, '../builds');

    let configFile = `server {
    listen 80;
    server_name _;
    
    location /${process.env.MISCELANEOUS_DIR}/ {
        proxy_pass http://localhost:${process.env.MISCELANEOUS_PORT};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }`;

    for (let i = 1; i <= userData.getAmount(); i++) {
        configFile += `\n\n\tlocation /${process.env.MISCELANEOUS_PROXY}/${userData.getFromId(String(i)).school}/ {
        alias ${baseBuildsDir}/${userData.getFromId(String(i)).school}/;
        index index.html;
        try_files $uri $uri/ /404.html;
    }`
    }

    configFile += `\n}`;

    console.log(configFile);

    await userData.writeFile(configFile, path.join(__dirname, '../nginx.conf'));
}