function Ping(options = {}) {
    var defaultOptions = {
        // ping every 999ms
        delay: 1000,
        url: `${window.origin}/favicon.ico?v=${Math.random()}`,
        callback: function (time) { }
    };
    options = Object.assign(defaultOptions, options);
    var pingReq = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('get', options.url);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                resolve(false);
            }
        };
    });
    var timeoutFunc = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(true);
        }, options.delay);
    });
    var startTime = Date.now();
    Promise.race([pingReq, timeoutFunc]).then(function (timeout) {
        var endTime = Date.now();
        options.callback({
            time: endTime - startTime,
            timeout: timeout,
        });
    });

}

module.exports = Ping;