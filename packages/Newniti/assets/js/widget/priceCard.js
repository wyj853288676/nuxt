const BaseWidget = require("./baseWidget");
class PriceCard extends BaseWidget {
    constructor(options) {
        var options = (arguments.length && typeof arguments[0] === 'object') ? arguments[0] : {};
        super(options);
        let defaultOptions = {
            ccyPair: null,
            tenor: null,
            price: 1000000,
            product: "SP",
        },
            constOptions = {
                name: "priceCard",
            };
        for (var i in defaultOptions) {
            if (options[i] != undefined) {
                defaultOptions[i] = options[i];
            }
        }
        Object.assign(this, defaultOptions, constOptions);
    }
};
Object.defineProperty(PriceCard, "staticData", {
    writable: false,
    value: {
        statusCode: {
            DEFAULT: 0,
            RATE_UP: 1,
            RATE_DOWN: 2,
        },
    },
});
module.exports = PriceCard;