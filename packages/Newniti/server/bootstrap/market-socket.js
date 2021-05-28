const _ = require("lodash");
const MESSAGE_TYPES = require("../../config/socket-message-types");
const co = require("co");

const StaticDataService = require("../service/StaticDataService"),
    MarketService = require("../service/MarketService"),
    AuthService = require("../service/AuthService");
const RATE_UPDATE_TIME_GAP = 10000,
    PRICE_UPDATE_TIME_GAP = 1000,
    MAX_HISTORY_LENGTH = 50;
const MarketSocket = {
    STATIC_DATA: null,
    //store the pairs each socket are subscribing {socketId: pairs}
    subPairs: {},
    //each pair contains the sockets that are subscribing it eg: {"USD/CNY":[socket,socket]};
    allSockets: {},
    //all pairs subscribing
    allSubPairs: [],
    //all pairs from static data
    allPairs: [],
    //save the history rates eg: {USD/CNY:[{rate:6.5420,time:timestamp}]}
    historyRates: {},
    //a interval timer that update the live rates of each pair
    rateUpdateTimer: null,
    //a interval timer that update the prices of each pair
    priceUpdateTimer: null,
    //a logger initialed in boot
    logger: null,
    //socket io
    io: null,


    /**
     * set a interval time that update the live rates
     * @params  
     */
    startBroadCastLiveRates: function () {
        let _this = this;
        if (_this.rateUpdateTimer) {
            clearInterval(_this.rateUpdateTimer);
        }
        _this.rateUpdateTimer = setInterval(() => {
            if (_this.allSubPairs.length === 0) {
                return;
            }
            let allSubPairs = _this.allSubPairs;
            for (let i = 0; i < allSubPairs.length; i++) {
                co(function* () {
                    //once one pair's rate is updated, io will emit one message to tell the client update the liveRate
                    let liveRates = {},
                        historyRates = _this.historyRates,
                        pair = allSubPairs[i],
                        pairSplit = pair.split("/"),
                        rate = yield MarketService.getLiveRates(pairSplit[0], pairSplit[1]);
                    if (rate.rate === null) {
                        return;
                    }
                    let lastRate = historyRates[pair] ? historyRates[pair].slice(-1)[0] : null;
                    //save the rate into historyRates
                    if (!historyRates[pair]) {
                        historyRates[pair] = [];
                    } else if (lastRate && lastRate.updatedAt && new Date(lastRate.updatedAt).getTime() >= new Date(rate.updatedAt).getTime()) {
                        //ignore duplicate data and old data
                        return;
                    }
                    liveRates[pair] = rate;
                    historyRates[pair].push(rate);
                    historyRates[pair] = historyRates[pair].slice(-MAX_HISTORY_LENGTH);
                    //send the live rate to the client that are subscribing the "pair"
                    let roomID = _this.getRoomID(pair);
                    _this.io.to(roomID).emit(MESSAGE_TYPES.LIVE_RATES, liveRates)
                }).catch((error) => {
                    error;
                    // _this.logger.error(`Error when getting rate:`, error);
                });
            }

        }, RATE_UPDATE_TIME_GAP);
    },


    /**
     * set a interval timer that update the prices of each pair 
     * eg. {
     *  USD/CNY:{
     *          buy:number,
     *          sell:number,
     *      }
     * }
     * @returns 
     */
    startBroadCastPrices: function () {
        let _this = this;
        if (_this.priceUpdateTimer) {
            clearInterval(_this.priceUpdateTimer);
        }
        _this.priceUpdateTimer = setInterval(() => {
            co(function* () {
                if (_this.allSubPairs.length === 0) {
                    return;
                }
                let prices = null;
                try {
                    prices = yield MarketService.getPrices(_this.allSubPairs);
                } catch (error) {
                    throw error;
                }
                for (let pair in prices) {
                    let roomID = _this.getRoomID(pair);
                    let data = {};
                    data[pair] = prices[pair];
                    _this.io.to(roomID).emit(MESSAGE_TYPES.PAIR_PRICE, data);
                }
            }).catch(error => {
                error;
            });
        }, PRICE_UPDATE_TIME_GAP)
    },



    /**
     * build the io and listen market message from client
     * @returns 
     */
    buildIO: function () {
        if (!this.io) {
            return;
        }
        let _this = this,
            io = this.io,
            logger = _this.logger;
        //check auth
        io.use(async (socket, next) => {
            let cookie = socket.handshake.headers.cookie;
            if (!cookie) return socket.disconnect();
            try {
                let isAuthenticated = await AuthService.isAuthenticated({
                    cookie,
                });
                if (isAuthenticated) {
                    next();
                } else {
                    socket.disconnect();
                    // next(MESSAGE_TYPES.NOT_AUTHENTICATED);
                }
            } catch (err) {
                _this.logger.error(err);
                socket.disconnect();
            }
        });
        io.on('connection', async (socket) => {
            logger.info(`a user connected`);
            socket.on(MESSAGE_TYPES.SUBSCRIBE_PAIRS_UPDATE, (data) => {
                _this.onSubscribePairUpdate(data, socket);
            });
            socket.on("disconnect", () => {
                let socketId = socket.id;
                logger.info(`a user disconnected`);
                delete _this.subPairs[socketId];
            });
        });
    },


    /**
     * 
     * @returns the socket room id
     */
    getRoomID: function (pair) {
        return `Room by pair ${pair}`;
    },


    /**
     * when client subpairs update
     * @param {*} context 
     */
    onSubscribePairUpdate: function (data, socket) {
        if (!socket || !Array.isArray(data)) {
            return;
        }
        let socketId = socket.id,
            syncHistoryRates = {},
            oldSubPairs = this.subPairs[socketId] ? this.subPairs[socketId] : [];
        //join some rooms
        for (let i = 0; i < data.length; i++) {
            let pair = data[i];
            if (this.allPairs.indexOf(pair) < 0) {
                this.logger.error(`Wrong pair received by market socket: ${pair}`);
                continue;
            }
            let roomID = this.getRoomID(pair);
            socket.join(roomID);
            //prepare the historyrates that need to be sync by socket
            if (this.historyRates[pair]) {
                syncHistoryRates[pair] = this.historyRates[pair];
            }
        };
        //leave some rooms
        for (let i = 0; i < oldSubPairs.length; i++) {
            let pair = oldSubPairs[i];
            if (data.indexOf(pair) >= 0) {
                continue;
            }
            let roomID = this.getRoomID(pair);
            socket.leave(roomID);
        }
        //sync the history rates with the client
        socket.emit(MESSAGE_TYPES.HISTORY_RATES, syncHistoryRates);
        this.subPairs[socketId] = data;
    },


    /**
     * This function build a socket server listener during the express-server building
     * @param {*} context - {server: http.createServer(express app)} 
     */
    boot: async function (context) {
        const {
            server,
            getLogger,
            mock,
        } = context;
        this.logger = getLogger("[bootstrap][socket]");
        this.STATIC_DATA = await StaticDataService.getStaticData();
        this.allPairs = Object.keys(this.STATIC_DATA.instruments);
        this.allSubPairs = Array.from(this.allPairs);
        this.io = require('socket.io')(server);
        this.buildIO();
        this.logger.info("start to broadcast live rates");
        this.startBroadCastLiveRates();
        this.logger.info("start to broadcast prices");
        this.startBroadCastPrices();
        this.logger.info(`socket listening`);
    }

}






module.exports = function (...args) {
    MarketSocket.boot(...args)
}