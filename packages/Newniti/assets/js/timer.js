const Timer = function(options = {}) {
    var defaultOptions = {
        delay: 1000,
        time: null,
    };
    options = Object.assign(defaultOptions, options);
    var _this = this;
    this.time = Date.now();
    this.options = options;
    this.timeFunc = setInterval(function() {
        _this.time = Date.now();
    }, options.delay);
};
Timer.stop = function(){
    clearInterval(this.timeFunc);
}
module.exports = Timer;