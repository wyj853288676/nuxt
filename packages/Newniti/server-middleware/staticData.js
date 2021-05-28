const app = require("express")();
const server = require("http").Server(app);
const co = require("co");
const StaticDataService = require("../server/service/StaticDataService");

app.get("/staticData", (req, res) => {
    co(function*() {
        let data = yield StaticDataService.getStaticData();
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});


module.exports = app;