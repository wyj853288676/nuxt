const Service = require("egg").Service;

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    create(params) {
        return new Promise((resolve, reject) => {
            const {
                username,
                password
            } = params;

            this.ctx.model.User.create({
                username,
                password
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    find(params) {
        return new Promise((resolve, reject) => {
            this.ctx.model.User.find(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    findOne(params) {
        return new Promise((resolve, reject) => {
            this.ctx.model.User.findOne(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    getUserSetting() {
        let { ctx } = this,
            user = ctx.user;
        if (!user) {
            return null;
        }
        return new Promise((resolve, reject) => {
            ctx.model.UserSetting.findOne({ uid: user.id }, (err, data) => {
                if (err) {
                    reject(err);
                } {
                    let { id, username } = user;
                    if (data) {
                        resolve({ id, username, userSetting: data });
                    } else {
                        //create empty usersetting
                        ctx.model.UserSetting.create({ uid: user.id }, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ id, username, userSetting: data });
                            }
                        });
                    }
                }
            });
        });
    }
    updateSetting(params) {
        let {
            themeIndex,
            tabs,
        } = params;
        return new Promise((resolve, reject) => {
            this.ctx.model.UserSetting.update({
                uid: this.ctx.user.id,
            }, {
                $set: {
                    themeIndex,
                    tabs,
                }
            }, {
                upsert: true,
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = UserService;