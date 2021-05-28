import Vue from "vue";
const io = require("socket.io-client");
const MESSAGE_TYPES = require("@/config/socket-message-types");
const MAX_RATES_LENGTH = 50;
const moment = require("moment");
let MARKET_SOCKET = null;
export const state = () => ({
    //eg {USD/CNY:{rate,updatedAt,index}}
    liveRates: {},
    pairSubCounter: {},
    //eg {USD/CNY: {buy:6.5,sell:6.6}}
    prices: {},
    MAX_RATES_LENGTH,
    socketStatus: 0,
    socketStatusCode: {
        NOT_READY: 0,
        CONNECTED: 1,
        DISCONNECTED: 2,
    },
});



export const getters = {
    allPairs: function () {
        let getters = arguments[3];
        return getters["staticData/allPairs"];
    },
};

export const mutations = {
    subPair: function (state, pair) {
        if (typeof pair === 'object') {
            var {
                pair,
                update
            } = pair;
        }
        if (this.getters["market/allPairs"].indexOf(pair) < 0) {
            return;
        }
        if (typeof state.pairSubCounter[pair] === "number") {
            state.pairSubCounter[pair]++;
        } else {
            Vue.set(state.pairSubCounter, pair, 1);
        }
        if (update !== false) {
            this.commit("market/updatePairSub");
        }
    },


    unsubPair: function (state, pair) {
        if (typeof pair === 'object') {
            var {
                pair,
                update
            } = pair;
        }
        if (this.getters["market/allPairs"].indexOf(pair) < 0 || !state.pairSubCounter[pair]) {
            return;
        }
        state.pairSubCounter[pair]--;
        if (state.pairSubCounter[pair] === 0 && update !== false) {
            this.commit("market/updatePairSub");
        }
    },


    changePair: function (state, data) {
        if (!typeof data === 'object') {
            return;
        }
        this.commit("market/subPair", {
            pair: data.newPair,
            update: false
        });
        this.commit("market/unsubPair", {
            pair: data.oldPair,
            update: false,
        });
        this.commit("market/updatePairSub");
    },

    updatePairSub: function (state) {
        let pairs = [];
        for (var i in state.pairSubCounter) {
            if (state.pairSubCounter[i] > 0) {
                pairs.push(i);
            }
        }
        if (MARKET_SOCKET) {
            MARKET_SOCKET.emit(MESSAGE_TYPES.SUBSCRIBE_PAIRS_UPDATE, pairs);
        }
    },


    buildSocket: function (state) {
        if (MARKET_SOCKET) {
            return;
        };
        let _this = this;
        MARKET_SOCKET = io();
        MARKET_SOCKET.on("connect", (e) => {
            _this.commit("market/updateSocketStatus");
            _this.commit("market/updatePairSub");
        });
        MARKET_SOCKET.on("disconnect", (e) => {
            _this.commit("market/updateSocketStatus");
        });
        MARKET_SOCKET.on(MESSAGE_TYPES.LIVE_RATES, (liveRates) => {
            _this.commit("market/updateLiveRates", liveRates);
        });
        MARKET_SOCKET.on(MESSAGE_TYPES.HISTORY_RATES, (historyRates) => {
            _this.commit("market/updateLiveRates", historyRates);
        });
        MARKET_SOCKET.on(MESSAGE_TYPES.PAIR_PRICE, (prices) => {
            _this.commit("market/updatePairPrice", prices);
        });
    },

    updateSocketStatus: function (state) {
        let codes = state.socketStatusCode;
        state.socketStatus = MARKET_SOCKET.disconnected ? codes.DISCONNECTED : codes.CONNECTED;
    },


    updateLiveRates: function (state, liveRates) {
        for (let pair in liveRates) {
            if (!state.liveRates[pair]) {
                Vue.set(state.liveRates, pair, []);
            }
            let pairRates = state.liveRates[pair],
                oldRatesLength = pairRates.length;
            if (Array.isArray(liveRates[pair])) {
                //liveRates is historyRates 
                if (state.liveRates[pair] && state.liveRates[pair].length > 0) {
                    continue;
                }
                state.liveRates[pair] = pairRates.concat(liveRates[pair]);
            } else {
                state.liveRates[pair].push(liveRates[pair]);
            }
            pairRates = state.liveRates[pair];
            //add index and format update at  to the new  data
            let counter = oldRatesLength ? (pairRates[oldRatesLength - 1].index + 1) : 0,
                length = pairRates.length;
            for (let i = oldRatesLength; i < length; i++) {
                pairRates[i].index = counter;
                pairRates[i].formatUpdatedAt = moment(new Date(pairRates[i].updatedAt)).format("MM-DD kk:mm:ss");
                counter++;
            }
            state.liveRates[pair] = state.liveRates[pair].slice(-MAX_RATES_LENGTH);
        }
    },


    updatePairPrice: function (state, prices) {
        for (var i in prices) {
            if (state.prices[i]) {
                state.prices[i] = prices[i];
            } else {
                Vue.set(state.prices, i, prices[i]);
            }
        }
    }

};