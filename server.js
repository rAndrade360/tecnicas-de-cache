const express = require("express");
const app = express();
const CacheFunctions = require('./cache/clientCache');
const port = process.env.PORT || 3333;

app.use(express.json());

app.get("/repos/:username", CacheFunctions.cache, CacheFunctions.fetchUserRepos);

app.listen(port);
