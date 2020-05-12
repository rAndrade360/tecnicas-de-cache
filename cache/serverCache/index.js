const NodeCache = require('node-cache');
const serverCache = new NodeCache();
const fetch = require("node-fetch");
const timeExpireInSeconds = 30;

module.exports = {

    cache(req, res, next) {
        const { username } = req.params;
        const value = serverCache.get(`repos/${username}`)
        if (value !== undefined) {
            return res.send(`<h1>Repository number: ${value}</h1>`);
        }
        next();
    },

    async fetchUserRepos(req, res, next) {
        const { username } = req.params;
        const userData = await fetch(`https://api.github.com/users/${username}`);
        const userDataInJson = await userData.json();
        const repos = await userDataInJson.public_repos;
        serverCache.set(`repos/${username}`, `${repos}`, timeExpireInSeconds);
        return res.send(`<h1>Repository number: ${repos}</h1>`);
    }
}