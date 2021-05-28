<template>
    <main>
        <el-header id="page-header">
            <nwt-header> </nwt-header>
        </el-header>
        <el-container style="height:calc(100% - 50px)">
            <el-container :direction="'vertical'" style="flex-wrap:wrap;height:100%">
                <div id='trading-container' class="scroll-control">
                    <nwt-main-container> </nwt-main-container>
                </div>
                <!-- blotter -->
                <div id='blotter-container'>
                    blotter
                </div>
            </el-container>
            <el-aside :style="{
                        minWidth: '350px',
                        backgroundColor: 'transparent',
                        padding: '0px',
                    }">
                Sider
            </el-aside>
        </el-container>
    </main>
</template>
<script>
//import plugins for index page
import "../plugins/client/components";
import "../plugins/client/widgets";
import "../plugins/client/filters";
//import store dynamically
import * as market from "../store-dynamical/market";
import * as page from "../store-dynamical/page";
import * as staticData from "../store-dynamical/staticData";
import * as theme from "../store-dynamical/theme";
import Vue from 'vue';
const axios = require("axios");

export default {
    middleware: ["authenticate"],
    async asyncData() {
        try {
            let result = await axios({
                url: "/api/user-setting",
                method: "GET",
            });
            result = result.data;
            let { userSetting, username } = result;
            return {
                userInfo: {
                    username,
                    userSetting,
                }
            };
        } catch (err) {
            console.error(err);
            Vue.prototype.$message({
                message: "Error when getting user's setting",
                type: "error",
                duration: 2000,
            });
        }
    },
    beforeCreate: function () {
        this.$store.registerModule("market", Object.assign({ namespaced: true }, market));
        this.$store.registerModule("page", Object.assign({ namespaced: true }, page));
        this.$store.registerModule("staticData", Object.assign({ namespaced: true }, staticData));
        this.$store.registerModule("theme", Object.assign({ namespaced: true }, theme));
    },
    mounted: function () {
        let userSetting = this.userSetting;
        //change the page theme
        var themeIndex = this.$store.state.theme.themeIndex;
        this.$store.commit("theme/changeTheme", themeIndex);
        //fetch the static data
        this.$store.commit("staticData/fetch");
    },
};
</script>
<style>
#trading-container {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px;
    height: 70%;
    width: 100%;
}
#blotter-container {
    width: 100%;
}
main {
    height: 100vh;
    overflow: hidden;
}
#page-header {
    height: 50px;
    background-color: transparent;
    padding: 0;
}
</style>
