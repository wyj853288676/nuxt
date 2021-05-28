module.exports = {
    keys: "123456",

    middleware: ["errorHandler", "auth",],
    errorHandler: {
        match: "/",
    },

    //unable the csrf-security-policy
    security: {
        csrf: {
            ignore: ctx => {
                ctx.ip;
                return true;
            }
        },
    },

    //database
    mongoose: {
        clients: {
            newniti: {
                url: 'mongodb://127.0.0.1:27017/newniti',
                options: {},
                // client scope plugin array
                plugins: []
            },
        },
        // public scope plugin array
        plugins: []
    },



};