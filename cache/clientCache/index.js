const fetch = require("node-fetch");

module.exports = {
    cache(req, res, next) {
        res.setHeader('Cache-Control', 'max-age:3600')
        next();
    },

    async fetchUserRepos(req, res, next) {
        const { username } = req.params;
        const userData = await fetch(`https://api.github.com/users/${username}`);
        const userDataInJson = await userData.json();
        const repos = await userDataInJson.public_repos;
        return res.send(`<h1>Repository number: ${repos}</h1>`);
    }
}