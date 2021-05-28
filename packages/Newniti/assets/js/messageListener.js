const listeners = [];
var MessageListener = function(options = {}) {
    var defaultOptions = {
        action: '*',
        handler: function() {},
    };
    options = Object.assign(defaultOptions, options);
    if (listeners[options.action] === undefined) {
        listeners[options.action] = [];
    }
    Object.assign(this, options);
    listeners[options.action].push(this);

};

MessageListener.prototype.destory = function() {
    var index = listeners.indexOf(this);
    if (index < 0) {
        return;
    }
    listeners.splice(index, 1);
}

window.addEventListener('message', function(message) {
    if (message.origin != window.origin) {
        return;
    }
    var action = message.data.action,
        actions = action == '*' ? ['*'] : [action, "*"];
    for (var i = 0; i < actions.length; i++) {
        action = actions[i];
        var targetListeners = listeners[action];
        if (targetListeners == undefined) {
            continue;
        }
        for (var j = 0; j < targetListeners.length; j++) {
            targetListeners[j].handler(message);
        };
    }

});

window.messageListeners = listeners;

module.exports = MessageListener;