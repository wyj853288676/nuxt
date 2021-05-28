const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose")
module.exports = app => {
    //use local strategy
    app.passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const user = {
            provider: "local",
            username,
            password,
        }
        app.passport.doVerify(req, user, done);
    }));

    //verify
    app.passport.verify(async (ctx, user) => {
        let { username, password } = user;
        let result = await ctx.service.user.findOne({ username, password });
        if (result) {
            return result;
        }
        return null;
    });

    //serialize user
    app.passport.serializeUser(async (ctx, user) => {
        return { id: user.id };
    });

    //unserialize user
    app.passport.deserializeUser(async (ctx, user) => {
        let realUser = await ctx.service.user.findOne({ _id: mongoose.Types.ObjectId(user.id) });
        return realUser;
    });
}