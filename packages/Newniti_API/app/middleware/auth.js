module.exports = () => {
    return async function errorHandler(ctx, next) {
        let url = ctx.request.originalUrl,
            loginReg = /^(?=\/login\/{0,1})/,
            authReg = /^(?=\/isAuthenticated\/{0,1})/,
            isAuthenticated = ctx.isAuthenticated();
        if (!isAuthenticated && !loginReg.test(url) && !authReg.test(url)) {
            return ctx.redirect("/login");
        } else if (isAuthenticated && loginReg.test(url)) {
            return ctx.redirect("/");
        }
        await next();
    };
}