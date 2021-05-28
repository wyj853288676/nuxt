// We instantiate Nuxt with the options
const config = require('./nuxt.config.js');
const isProd = process.env.NODE_ENV === 'production';
const getLogger = require("./plugins/logger");
const logger = getLogger("App");
const port = process.env.PORT || 3000;
const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const co = require("co");
const {
    Nuxt,
    Builder
} = require('nuxt');


config.dev = !isProd;

const nuxt = new Nuxt(config);
// Start build process in dev mode
if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);

// Listen the server
server.listen(port, '0.0.0.0');
logger.info("Server listening on localhost:" + port);


// start the tasks when the nuxt app is booting
let context = {
    app,
    server,
    getLogger,
    isProd,
    mock: process.env.mockMode == "true",
};
try {
    (async function () {
        const marketSocket = require("./server/bootstrap/market-socket");
        marketSocket(context);
    })();
} catch (e) {
    logger.error(typeof e === 'object' ? e.message : e);
}