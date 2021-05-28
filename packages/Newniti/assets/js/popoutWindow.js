const PopoutWindow = function(options = {}) {
    var defaultOptions = {
        url: "",
        name: "_blank",
        specs: {
            width: 400,
            height: 400,
            toolbar: 'no',
            menubar: 'no',
            scrollbars: 'no',
            resizable: 'no',
            location: 'no',
            status: 'no',
        },
        onLoad: function() {},
        onClose: function() {
            console.log('popout window close');
        },
        checkClosedDelay: 500, // how many ms to check if the window is close once; set 0 or number less than 0 to stop checking;
    };

    defaultOptions.specs = Object.assign(defaultOptions.specs, options.specs);
    options = Object.assign(defaultOptions, options);
    options.specs = getSpecs(options.specs);

    var windowObj = window.open(options.url, options.name, options.specs);;
    this.options = options;
    this.window = windowObj;
    windowObj.addEventListener('load', options.onLoad);
    windowObj.onbeforeunload = options.onClose;
    var _this = this;
    if (options.checkClosedDelay > 0) {
        this.intervalFunc = setInterval(function() {
            if (_this.window.closed) {
                _this.options['onClose']();
                clearInterval(_this.intervalFunc);
            }
        }, options.checkClosedDelay);
    }
};

function getSpecs(obj) {
    var specs = [];
    for (var i in obj) {
        specs.push(`${i}=${obj[i]}`);
    }
    return specs.join(',');
}

module.exports = PopoutWindow;