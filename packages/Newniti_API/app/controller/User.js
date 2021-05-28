const BaseController = require("../core/BaseController");
const createRule = {
    username: "username",
    password: "string",
};
class UserController extends BaseController {
    async findById() {
        const {
            ctx
        } = this;
    }
    async create() {
        const {
            ctx,
            service,
        } = this;
        try {
            //validate the params if false, throw exception(errorCode 422);
            ctx.validate(createRule, ctx.request.body);
        } catch (error) {
            ctx.throw(422, error);
        }

        try {
            let result = await service.user.create(ctx.request.body);
            ctx.body = {
                id: result.id
            };
            ctx.status = 200;
        } catch (error) {
            ctx.throw(500, typeof error === 'object' ? error.message : error);
        }
    }
    async getUserSetting() {
        const { ctx } = this;
        try {
            let result = await this.service.user.getUserSetting();
            ctx.body = result;
            ctx.status = 200;
        } catch (error) {
            ctx.throw(500, typeof error === 'object' ? error.message : error);
        }
    }
    async updateSetting() {
        const { ctx } = this;
        try {
            let result = await this.service.user.updateSetting(ctx.request.body);
            ctx.body = result;
            ctx.status = 200;
        } catch (error) {
            ctx.throw(500, typeof error === 'object' ? error.message : error);
        }
    }

};



module.exports = UserController;