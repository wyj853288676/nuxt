<template>
    <el-row class="flex-wrap">
        <el-col></el-col>
        <el-col class="mobile-hide">
            <el-row type="flex" justify="end">
                <!-- time -->
                <el-link class="header-child" :underline="false">
                    <nts-clock :time="time"></nts-clock>
                </el-link>
                <!-- page lock -->
                <el-link
                    @click="lockPage()"
                    class="header-child page-lock-link"
                    :underline="false"
                >
                    <i
                        class="el-icon"
                        :class="pageLocked ? 'el-icon-lock' : 'el-icon-unlock'"
                    ></i>
                    {{ pageLocked ? "Unlock" : "Lock" }} Screen
                </el-link>
                <!-- settings -->
                <el-link class="header-child" :underline="false">
                    <i class="el-icon el-icon-setting"></i>
                    Settings
                </el-link>
                <!-- user info -->
                <el-link class="header-child" :underline="false">
                    <a-icon type="user" />
                    User Info
                </el-link>
                <!-- log out -->
                <el-link class="header-child" :underline="false">
                    <a-icon type="logout" class="el-icon" /> log out
                </el-link>
                <!-- server connection status -->
                <el-link
                    class="header-child"
                    :underline="false"
                    id="server-delay-link"
                >
                    <el-popover
                        popper-class="server-delay-popover"
                        placement="bottom-end"
                        trigger="click"
                    >
                        <server-delay-chart
                            :chartDatas="serverDelays"
                            :maxY="pingDelay"
                        >
                            <template slot="chartHeader">
                                <h5>
                                    <el-link
                                        :underline="false"
                                        class="text-sm"
                                        style="font-size: inherit"
                                    >
                                        Average Delay ( last 5 times) :
                                        {{ Number(averageDelay).toFixed(2) }} ms
                                    </el-link>
                                </h5>
                            </template>
                        </server-delay-chart>
                        <server-signal
                            slot="reference"
                            class="el-icon"
                            :signalLevel="signalLevel"
                        >
                        </server-signal>
                    </el-popover>
                </el-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import serverDelayChart from "./server-delay-chart";
import Vue from "vue";
import serverSignal from "./server-signal";
Vue.component("server-delay-chart", serverDelayChart);
Vue.component("server-signal", serverSignal);
export default {
    components: { serverSignal },
    data() {
        return {
            time: Date.now(),
            timeFunc: null,
            pingDelay: 1000,
            //max length of serverDelays
            delaysLimit: 20,
            serverDelays: [],
        };
    },
    computed: {
        pageLocked: function () {
            return this.$store.state.pageLocked;
        },
        averageDelay: function () {
            if (this.serverDelays.length == 0) {
                return 0;
            }
            var length = 5;
            var delays =
                this.serverDelays.length > length
                    ? this.serverDelays.slice(this.serverDelays.length - length)
                    : this.serverDelays;
            var sum = 0;
            for (var i = 0; i < delays.length; i++) {
                sum += delays[i].time;
            }
            return sum / delays.length;
        },
        signalLevel: function () {
            var averageDelay = this.averageDelay,
                pingDelay = this.pingDelay;
            if (averageDelay < pingDelay / 4) {
                return 4;
            } else if (averageDelay < pingDelay / 2) {
                return 3;
            } else if (averageDelay < (pingDelay * 3) / 4) {
                return 2;
            } else {
                return 1;
            }
        },
    },
    methods: {
        lockPage: function () {
            if (this.pageLocked) {
                this.$store.commit("unlockPage");
            } else {
                this.$store.commit("lockPage");
            }
        },
        pingServer: function () {
            clearInterval(this.pingFunc);
            var _this = this,
                Ping = this.Ping;
            this.pingFunc = setInterval(function () {
                new Ping({
                    delay: _this.pingDelay,
                    callback: function (data) {
                        _this.serverDelays.push(data);
                        let length = _this.serverDelays.length;
                        if (length > _this.delaysLimit) {
                            _this.serverDelays = _this.serverDelays.slice(
                                length - _this.delaysLimit,
                                length + 1
                            );
                        }
                    },
                });
            }, this.pingDelay);
        },
    },
    mounted: function () {
        var _this = this;
        //start calendar
        this.timeFunc = setInterval(function () {
            _this.time = Date.now();
        }, 1000);
        //start ping server
        this.pingServer();
    },
    destory: function () {
        clearInterval(this.timeFunc);
    },
};
</script>
<style lang="scss">
@import "./header.scss";
</style>