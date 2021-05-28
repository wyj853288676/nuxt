import co from "co";
import * as _ from "lodash";
const axios = require("axios");
let STATIC_DATA = {};
export const state = () => ({
    staticData: null,
});
export const getters = {
    allPairs: function(state, getter) {
        return (state.staticData && state.staticData.sortedPairs) ? state.staticData.sortedPairs : [];
    }
};

export const mutations = {
    fetch: function() {
        let _this = this;
        co(function*() {
            STATIC_DATA = (yield axios.get("staticData")).data;
            _this.commit("staticData/set");
        });
    },
    set: function(state) {
        state.staticData = STATIC_DATA;
    }
};