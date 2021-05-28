class Widget {
    constructor(arg) {
        let options = (arguments.length && typeof arguments[0] === 'object') ? arguments[0] : {};
        let defaultOptions = {
            //name of the vue component
            name: "base-widget",
            title: "",
            //  the thumbnail's name of the vue component
            thumbnail: "",
            popoutable: true,
            closable: true,
            configable: false,
            movable: true,
        };
        for (var i in defaultOptions) {
            if (options[i] != undefined) {
                defaultOptions[i] = options[i];
            }
        }
        Object.assign(this, defaultOptions);
    }
}

module.exports = Widget;