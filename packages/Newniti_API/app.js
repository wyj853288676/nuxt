const bootValidator = require("./bootstrap/validator");
const bootPassport = require("./bootstrap/passport");
class AppBootHook {
    constructor(app) {
        this.app = app;
    }


    configWillLoad() {

    }


    async didLoad() {

    }


    async willReady() {

    }


    async didReady() {
        //add validator
        bootValidator(this.app);
        //passport
        bootPassport(this.app)
    }


    async serverDidReady() {

    }

}

module.exports = AppBootHook;