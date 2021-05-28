module.exports = app => {
    app.validator.addRule("username", (rule, value) => {
        if (!value) {
            return "Username can not be empty";
        }
    });
    app.validator.addRule("unique_username", (rule, value) => {
        if (!value) {
            return "Password can not be empty";
        }
    });
}