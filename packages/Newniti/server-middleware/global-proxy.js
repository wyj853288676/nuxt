const app = require("express")();
const axios = require("axios");
const AuthService = require("../server/service/AuthService");
const apiReg = /^(?=\/api\/{0,1})/,
    loginReg = /^(?=\/login\/{0,1})/,
    logoutReg = /^(?=\/logout\/{0,1})/;

app.all("*", async (req, res, next) => {
    let url = req.originalUrl,
        cookie = req.headers.cookie || "";
    if (!apiReg.test(url)) {
        try {
            let isAuthenticated = await AuthService.isAuthenticated({
                cookie: cookie,
            })
            if (isAuthenticated) {
                if (loginReg.test(url)) {
                    return res.redirect("/");
                }
            } else {
                if (!loginReg.test(url)) {
                    return res.redirect("/login");
                }
            }
            next();
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        next();
    }
});

module.exports = app;