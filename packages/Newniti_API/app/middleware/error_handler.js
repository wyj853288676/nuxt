module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch (err) {
            ctx.app.emit("error", err, ctx);
            const status = err.status || 500;
            ctx.status = status;
            if (status === 422) {
                ctx.body = {
                    detail: err.erros || err.message,
                };
            } else {
                const error = status === 500 && ctx.app.config.env === "prod" ? "Interval Server Error" : err.message;
                ctx.body = {
                    error
                };
            }

        }
    };
}