const sortedPairs = ["USD/CNY", "JPY/CNY", "EUR/CNY", "KRW/CNY", "HKD/CNY"];
module.exports = {
    getStaticData: function() {
        return new Promise(function(resolve, reject) {
            const staticData = require("../../mock/static_data.json");

            let instruments = {};
            for (let i = 0; i < sortedPairs.length; i++) {
                instruments[sortedPairs[i]] = staticData.instruments[sortedPairs[i]];
            }
            staticData.instruments = instruments;
            staticData.sortedPairs = sortedPairs;

            resolve(staticData);
        });
    }
}