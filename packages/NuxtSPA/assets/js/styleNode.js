var StyleNode = function(options = {}) {
    var defaultOptions = {
        appendToBody: true,
        node: undefined,
        parentNode:null,
    };
    var options = Object.assign(defaultOptions, options);

    if (options.node === undefined) {
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        this.styleNode = styleNode;
    }else{
        this.styleNode = options.node;
    }
    if (options.appendToBody && options.node === undefined) {
        this.appendToBody(options.parentNode);
    }
}
StyleNode.prototype.write = function(cssText, incrementalUpdate = false) {
    if (!incrementalUpdate) {
        this.styleNode.innerText = '';
    }
    try {
        this.styleNode.appendChild(document.createTextNode(cssText));
    } catch (ex) {
        // IE
        this.styleNode.styleSheet.cssText = cssText;
    };
};
StyleNode.prototype.appendToBody = function(parentNode = null) {
    if(parentNode == null){
        var parentNode = document.getElementsByTagName("head")[0];
    }
    parentNode.appendChild(this.styleNode);
}

module.exports = StyleNode;