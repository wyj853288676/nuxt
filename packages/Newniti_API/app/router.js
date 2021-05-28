module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.post("/user", controller.user.create);
    router.post("/user-setting", controller.user.updateSetting);
    router.get("/user-setting", controller.user.getUserSetting);


    const localStrategy = app.passport.authenticate("local", {
        successReturnToOrRedirect: "/",
    });
    router.post("/login", localStrategy);
    router.post("/logout", controller.site.logout);

    router.get("/isAuthenticated", controller.site.isAuthenticated);

}