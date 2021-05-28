const _ = require("lodash");
const Vue = require("vue").default;
const {
    Matrix
} = require("../Matrix");
const BaseWidget = require("./baseWidget");
class DashboardPanel {
    constructor(options) {
        var options = arguments.length == 0 ? {} : arguments[0];
        var defaultOptions = {
            x: 0,
            y: 0,
            lengthRow: 1,
            lengthCol: 1,
            status: DashboardPanel.statusCode.DEFAULT,
            sizeOffsetX: 0,
            sizeOffsetY: 0,
            key: Math.random() + "-" + new Date().getTime(),
            widget: null,
        };
        var constOptions = {
            transform: new Matrix(),
            resizeDirection: "right-down", // left right up down
        };
        this.defaultOptions = JSON.parse(JSON.stringify(defaultOptions));
        Object.assign(defaultOptions, options, constOptions);
        let widgets = Vue.prototype.widgets,
            widgetName = _.get(defaultOptions, ["widget", "name"], null),
            widgetClass = (widgetName && widgets[widgetName]) ? widgets[widgetName] : null;
        if (!widgetName || !widgetClass) {
            defaultOptions.widget = new BaseWidget(defaultOptions.widget);
        } else if (!defaultOptions.widget instanceof widgetClass) {
            defaultOptions.widget = new widgetClass(defaultOptions.widget);
        }
        Object.assign(this, defaultOptions);
        return new Proxy(this, {
            set(target, key, value, receiver) {
                switch (key) {
                    case "status":
                        return statusProxy(target, value, receiver);
                    case "transform":
                        return transformProxy(target, value, receiver);
                    default:
                        return Reflect.set(target, key, value, receiver);
                }
            }
        });

    }
}

function transformProxy(target, value, receiver) {
    if (!value instanceof Matrix) {
        throw new Error(`the transform property must be an instance of Matrix`);
    }
    return Reflect.set(target, "transform", value, receiver);
}

function statusProxy(target, value, receiver) {
    let codes = Object.values(DashboardPanel.statusCode);
    if (codes.indexOf(value) < 0) {
        throw new Error(`the status of a DashboardPanel instance must be one of ${codes.join(' ')}`);
    }
    return Reflect.set(target, 'status', value, receiver);
}


Object.defineProperty(DashboardPanel, "statusCode", {
    writable: false,
    value: {
        DEFAULT: 0,
        DRAGGING: 1,
        RESIZING: 2,
    },
});

module.exports = DashboardPanel;