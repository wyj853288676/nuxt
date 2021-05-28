const axios = require("axios");
const logger = require("../../plugins/logger")("[AuthService]");
module.exports = {
    isAuthenticated(headers = {}) {
        return new Promise(async (res, rej) => {
            try {
                let isAuthenticated = await axios({
                    method: "GET",
                    url: "http://127.0.0.1:3000/api/isAuthenticated",
                    headers: Object.assign({}, headers),
                });
                res(isAuthenticated.data);
            } catch (err) {
                logger.error(err);
                rej("Error when authenticating")
            }
        });
    },
}