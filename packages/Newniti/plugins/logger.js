const log4js = require("log4js");
const getLogger = function(prefix, level = "info") {
    let logger = log4js.getLogger(prefix),
        isProd = process.env.NODE_ENV === 'production';
    logger.level = !isProd ? "debug" : level;
    return logger;
};

module.exports = getLogger;