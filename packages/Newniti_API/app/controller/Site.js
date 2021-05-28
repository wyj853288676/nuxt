const BaseController = require("../core/BaseController");
const login = {
    username: "username",
    password: "string",
};
class SiteController extends BaseController {
    isAuthenticated() {
        this.ctx.status = 200;
        this.ctx.body = this.ctx.isAuthenticated();
    }
    logout() {
        let { ctx } = this;
        if (!ctx.isAuthenticated()) {
            ctx.throw(401);
        } else {
            ctx.logout();
            ctx.redirect("/");
        }
    }
    
}

module.exports = SiteController;