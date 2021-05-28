<template>
    <div class="widget-market-price">
        <el-container
            v-show="status === 'config'"
            class="market-price-config-container nts-fade-in"
        >
            <el-row class="flex-container">
                <el-col :span="8" class="cursor-default input-title"
                    >Tenor</el-col
                >
                <el-col :span="16">
                    <el-select
                        :popper-append-to-body="false"
                        v-model="form.tenor"
                        placeholder=""
                    >
                        <el-option
                            v-for="item in tenorOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="cursor-default input-title">
                    CCY Pair
                </el-col>
                <el-col :span="16">
                    <el-select
                        autocomplete="on"
                        :popper-append-to-body="false"
                        v-model="form.ccyPair"
                        placeholder=""
                    >
                        <el-option
                            v-for="pair in ccyPairs"
                            :key="pair"
                            :label="pair"
                            :value="pair"
                        >
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="cursor-default input-title">
                    Platform
                </el-col>
                <el-col :span="16">
                    <el-select
                        :popper-append-to-body="false"
                        v-model="form.platform"
                        placeholder=""
                    >
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="cursor-default input-title">
                    TIF
                </el-col>
                <el-col :span="16">
                    <el-select
                        :popper-append-to-body="false"
                        v-model="form.platform"
                        placeholder=""
                    >
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="cursor-default input-title">
                    Mode
                </el-col>
                <el-col :span="6">
                    <el-select
                        :popper-append-to-body="false"
                        v-model="form.platform"
                        placeholder=""
                    >
                    </el-select>
                </el-col>
                <el-col :span="9" :offset="1">
                    <el-select
                        :popper-append-to-body="false"
                        v-model="form.platform"
                        placeholder=""
                    >
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-checkbox>Protected</el-checkbox>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-checkbox>Range</el-checkbox>
                </el-col>
            </el-row>
            <br />
            <el-row class="flex-container">
                <el-button
                    @click="finishConfig()"
                    type="primary"
                    class="btn-form-control light-hover btn-shadowed"
                    >Done</el-button
                >
            </el-row>
        </el-container>
        <!--config end-->
        <component
            v-if="status === 'configed'"
            :is="panelComponentId"
            ref="panelComponent"
        ></component>
    </div>
</template>
<script>
import Vue from "vue";
import fwdComponent from "./panels/fwd";
import spComponent from "./panels/sp";
import swpComponent from "./panels/swp";
Vue.component("market-price-panel-fwd", fwdComponent);
Vue.component("market-price-panel-swp", swpComponent);
Vue.component("market-price-panel-sp", spComponent);

const themeStyles = require("./themeStyles");

const mockDatas = require("./mockDatas");

export default {
    props: {},
    data() {
        var data = {
            form: {
                ccyPair: "",
                platform: "",
                tenor: "SP",
            },
            status: "config",
            tenorOptions: ["SP", "FWD", "SWP"],
        };
        data = Object.assign(data, mockDatas);
        return data;
    },
    methods: {
        themeStyles: themeStyles,
        resizePriceNumber: function () {
            if (!this.$refs["panelComponent"]) {
                return;
            }
            var list = ["priceNumber-buy", "priceNumber-sell"];
            for (var i = 0; i < list.length; i++) {
                var component = this.$refs["panelComponent"].$refs[list[i]];
                if (component === undefined) {
                    continue;
                }
                component.resizeNumber(300);
            }
        },
        onResize: function () {
            this.resizePriceNumber();
        },
        finishConfig: function () {
            this.status = "configed";
        },
        configWidget: function () {
            this.status = "config";
        },
    },
    computed: {
        panelComponentId: function () {
            return "market-price-panel-" + this.form.tenor.toLowerCase();
        },
    },
    mounted() {
        this.$store.commit("addStyles", themeStyles);
    },
};
</script>
<style lang="scss">
@import "./marketPrice.scss";
</style>