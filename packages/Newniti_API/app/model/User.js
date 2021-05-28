const { MD5 } = require("crypto-js");
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('newniti');

    const UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            set(password) {
                if (!password) {
                    return null;
                }
                return MD5(password).toString();
            },
        },
        created: {
            type: Date,
            default: new Date(),
        },
        updated: {
            type: Date,
            default: new Date(),
        },
    });

    return conn.model('User', UserSchema);
};
