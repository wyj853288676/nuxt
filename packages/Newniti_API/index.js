const eggCluster = require("egg-cluster");

eggCluster.startCluster({
    baseDir: __dirname,
    workers: 1,
});