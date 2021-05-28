module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('newniti');

    const UserSettingSchema = new Schema({
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        themeIndex: {
            type: Number,
            default: 0,
        },
        tabs: {
            type: Array,
            default: [],
            set(tabs) {
                if (!Array.isArray(tabs)) {
                    return tabs;
                }
                return tabs;
            }
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

    return conn.model('UserSetting', UserSettingSchema);

};