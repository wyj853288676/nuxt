const BaseWidget = require("./baseWidget");
let list = [{
        name: "priceCard",
        title: "",
    },

];

let widgetList = [];
for (var i = 0; i < list.length; i++) {
    widgetList.push(new BaseWidget(list[i]));
}

module.exports = widgetList;