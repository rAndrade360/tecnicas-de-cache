const redis = require("redis");
const redisClient = redis.createClient();
const fetch = require("node-fetch");
const timeExpireInSeconds = 30;
module.exports = {
    cache(req, res, next) {
        const { username } = req.params;
        redisClient.get(`repos/${username}`, function (err, value) {
            if (err) {
                throw err;
            }
            if (value !== null) {
                return res.send(`<h1>Repository number: ${value}</h1>`);
            }
            next();
        });
    },

    async fetchUserRepos(req, res, next) {
        const { username } = req.params;
        const userData = await fetch(`https://api.github.com/users/${username}`);
        const userDataInJson = await userData.json();
        const repos = await userDataInJson.public_repos;
        redisClient.setex(`repos/${username}`, timeExpireInSeconds, `${repos}`);
        return res.send(`<h1>Repository number: ${repos}</h1>`);
    }
}