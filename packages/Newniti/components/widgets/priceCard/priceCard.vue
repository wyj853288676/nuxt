<template>
    <div class="widget-price-card" :price-not-available="!marketPrice || !marketAvailable" :market-not-available="!marketAvailable">
        <!-- main part -->
        <div class="widget-price-card-body">
            <!-- pair -->
            <el-row class="widget-price-card-pair" type="flex" justify="start">
                <el-select v-model="widget.ccyPair" filterable default-first-option placeholder="Pair" class="bottom-border-input" autocomplete="on" style="width: 6.5em; margin-right: 2px" :popper-append-to-body="false">
                    <el-option v-for="item in ccyPairs" :key="item" :label="item" :value="item">
                    </el-option>
                    <template v-slot:empty>
                        <span class="text-sm">
                            <el-row type="flex" justify="center" style="padding: 5px">
                                empty
                            </el-row>
                        </span>
                    </template>
                </el-select>
            </el-row>
            <!-- product -->
            <el-row class="widget-price-card-product" type="flex" justify="end">
                <el-select v-model="widget.product" filterable default-first-option placeholder="Product" class="bottom-border-input" autocomplete="on" style="width: 5em" :popper-append-to-body="false">
                    <template v-slot:empty>
                        <span class="text-sm">
                            <span class="text-sm">
                                <el-row type="flex" justify="center" style="padding: 5px">
                                    empty
                                </el-row>
                            </span></span>
                    </template>
                    <el-option v-for="item in productTypes" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-row>
            <!-- chart -->
            <el-row v-loading="formReady && !chartDataReady" element-loading-background="transparent" class="widget-price-card-chart" type="flex" justify="start">
                <el-col :style="{display: formReady ? 'none !important' : ''}" class="widget-price-card-chart-alert">
                    <div class="">
                        <i class="el-icon-info"></i>
                        Please select a CCY Pair
                    </div>
                </el-col>
                <el-col :style="{display: (!chartDataReady || !formReady) ? 'none !important':'' }" class="widget-price-card-chart-body"> </el-col>
                <div :style="{display: (!chartDataReady || !formReady) ? 'none !important':'' }" class="widget-price-card-chart-sider">
                    <i class="el-icon-caret-top text-lg" style="color: var(--common-success)" :style="{
                            opacity: rateUpOrDown === statusCode.RATE_UP ? 1 : 0,
                        }"></i>
                    <div style="opacity: 0.5">
                        {{ rateChange }}
                    </div>
                    <i class="el-icon-caret-bottom text-lg" style="color: var(--common-danger)" :style="{
                            opacity: rateUpOrDown === statusCode.RATE_DOWN ? 1: 0,
                        }"></i>
                </div>
            </el-row>
            <!-- trade -->
            <el-row class="widget-price-card-trade">
                <div class="widget-price-card-trade-card" type="sell">
                    <div class="trade-title text-sm">SELL</div>
                    <price-number :numberList="sellPriceArr"></price-number>
                    <a-icon class="icon-price-not-available" v-if="!marketAvailable || !marketPrice" type="stop" />
                </div>
                <div class="widget-price-card-trade-card" type="buy">
                    <div class="trade-title text-sm">BUY</div>
                    <price-number :numberList="buyPriceArr"></price-number>
                    <a-icon class="icon-price-not-available" v-if="!marketAvailable || !marketPrice" type="stop" />
                </div>
            </el-row>
            <!-- price -->
            <el-row class="widget-price-card-price" type="flex" justify="start">
                <el-select v-model="widget.price" filterable default-first-option placeholder="Price" class="bottom-border-input" autocomplete="on" style="width: 6em" :popper-append-to-body="false">
                    <template v-slot:empty>
                        <span class="text-sm">
                            <span class="text-sm">
                                <el-row type="flex" justify="center" style="padding: 5px">
                                    empty
                                </el-row>
                            </span></span>
                    </template>
                    <el-option v-for="item in prices" :key="'price-' + item" :label="toPriceStr(item)" :value="item">
                    </el-option>
                </el-select>
            </el-row>
        </div>
    </div>
</template>
<script>
const _ = require("lodash");
const PriceCard = require("@/assets/js/widget/priceCard");
const mockData = [];
const style = require("./style.js");
const Decimal = require("decimal.js");
export default {
    props: {
        widget: {
            type: PriceCard,
            default: () => new PriceCard(),
        },
    },
    data: function () {
        return {
            chart: null,
            chartDataCounter: 0,
            //realtime market data
            mock: {
                interval: null,
                baseValue: 10,
                timeGap: 1500,
                sellPrice: 12.123,
                buyPrice: 10.456,
            },
        };
    },

    computed: {
        liveRates: function () {
            let liveRates = this.$store.state.market.liveRates[this.ccyPair]
            return liveRates ? liveRates : [];
        },
        marketPrice: function () {
            let prices = this.$store.state.market.prices;
            return prices[this.ccyPair] ? prices[this.ccyPair] : null;
        },
        sellPrice: function () {
            return this.marketPrice ? this.marketPrice.sell : null;
        },
        buyPrice: function () {
            return this.marketPrice ? this.marketPrice.buy : null;
        },
        statusCode: function () {
            return PriceCard.staticData.statusCode;
        },
        staticData: function () {
            return this.$store.state.staticData.staticData;
        },
        productTypes: function () {
            return ["SP"];
        },
        tenors: function () {
            let tenors = this.staticData.tenors,
                product = this.widget.product;
            return tenors ? this.staticData.tenors[product] : [];
        },
        instruments: function () {
            return this.staticData.instruments;
        },
        ccyPairs: function () {
            return this.staticData.sortedPairs;
        },
        prices: function () {
            return [
                1000000,
                2000000,
                3000000,
                4000000,
                5000000,
                6000000,
                7000000,
                8000000,
                9000000,
            ];
        },
        rateChange: function () {
            if (!this.liveRates || this.liveRates.length < 2) {
                return 0;
            }
            let liveRates = this.liveRates,
                rateChange = new Decimal(liveRates[liveRates.length - 1].rate).minus(liveRates[liveRates.length - 2].rate);
            return Math.abs(rateChange.valueOf());
        },
        rateUpOrDown: function () {
            if (this.rateChange > 0) {
                return this.statusCode.RATE_UP;
            } else if (this.rateChange < 0) {
                return this.statusCode.RATE_DOWN;
            } else {
                return this.statusCode.DEFAULT;
            }

        },

        sellPriceArr: function () {
            if (!this.sellPrice) {
                return [];
            }
            let price = Number(this.sellPrice).toFixed(4).split("");
            return this.getPriceArr(price);
        },
        buyPriceArr: function () {
            if (!this.buyPrice) {
                return [];
            }
            let price = Number(this.buyPrice).toFixed(4).split("");
            return this.getPriceArr(price);
        },
        theme: function () {
            //re draw chart when theme change
            return this.$store.state.theme.themes[
                this.$store.state.theme.themeIndex
            ];
        },
        themeIndex: function () {
            return this.$store.state.theme.themeIndex;
        },
        chartColor: function () {
            const am4core = this.am4core;
            return {
                main: am4core.color(this.theme.colorList.color.vice),
                mainStr: this.theme.colorList.color.vice
            };
        },
        ccyPair: function () {
            return this.widget.ccyPair;
        },
        MAX_RATES_LENGTH: function () {
            return this.$store.state.market.MAX_RATES_LENGTH;
        },
        chartDataReady: function () {
            return this.liveRates.length > 0;
        },
        formReady: function () {
            return !!this.widget.ccyPair;
        },
        marketAvailable: function () {
            return this.$store.state.market.socketStatus === this.$store.state.market.socketStatusCode.CONNECTED;
        },
    },
    methods: {
        renderChart: function () {
            draw.call(this);
        },
        disposeChart: function () {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
        },
        getPriceArr: function (prices) {
            let arr = _.cloneDeep(prices);
            let index = arr.indexOf(".");
            arr[index + 1] = {
                size: "big",
                number: arr[index + 1],
            };
            arr[index + 2] = {
                size: "big",
                number: arr[index + 2],
            };
            return arr;
        },
    },
    watch: {
        liveRates: function (newValue, oldValue) {
            //when I use Vue.set(state.liveRates,pair,value) in market.js,
            //even though the pair dosen't equal this.ccyPair, it will still cause the watcher,but the newValue === oldValue
            if (newValue === oldValue) {
                return true;
            }
            //add "index" property as the value of chart's xAxis
            let lengthChange = newValue.length - oldValue.length;
            if (!this.chart || this.chart.ccyPair != this.ccyPair) {
                this.renderChart();
            } else {
                this.chart.addData(newValue.slice(lengthChange === 0 ? -1 : -lengthChange), oldValue.length >= this.MAX_RATES_LENGTH ? 1 : 0);
            }
        },
        ccyPair: function (newPair, oldPair) {
            this.$store.commit("market/changePair", {
                oldPair,
                newPair,
            });
        },
        themeIndex: function () {
            //change color for series
            reDraw.call(this);
        },
    },
    mounted: function () {
        this.renderChart();
        //add style
        this.$store.commit("theme/addStyle", style);
    },
    destroyed: function () {
        this.disposeChart();
        if (this.mock.interval) {
            clearInterval(this.mock.interval);
        }
        if (this.ccyPair) {
            this.$store.commit("market/unsubPair", this.ccyPair);
        }
    },
};

function draw() {
    const am4core = this.am4core,
        am4charts = this.am4charts,
        chartdiv = this.$el.querySelector(".widget-price-card-chart-body"),
        _this = this;
    if (this.chart) {
        this.disposeChart();
    }
    am4core.ready(function () {
        var chart = am4core.create(chartdiv, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;
        //record the ccyPair when char rendering
        chart.ccyPair = _this.ccyPair;
        chart.padding(0, 0, 0, 0);
        //disable  zoom 
        chart.zoomOutButton.disabled = true;


        chart.data = _this.liveRates;

        var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        xAxis.renderer.grid.template.location = 0;
        xAxis.renderer.minGridDistance = 30;
        xAxis.renderer.inside = true;
        xAxis.renderer.ticks.template.disabled = true;
        xAxis.dataFields.value = "index";
        xAxis.tooltip.disabled = true;
        xAxis.interpolationDuration = 500;
        xAxis.rangeChangeDuration = 500;
        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.tooltip.disabled = true;
        yAxis.renderer.inside = true;
        yAxis.renderer.ticks.template.disabled = true;
        yAxis.dataFields.value = "rate";
        //disable all grid
        yAxis.renderer.grid.template.strokeOpacity = 0;
        yAxis.renderer.baseGrid.disabled = true;
        xAxis.renderer.grid.template.strokeOpacity = 0;
        xAxis.renderer.baseGrid.disabled = true;
        // disable all labels
        xAxis.renderer.labels.template.disabled = true;
        yAxis.renderer.labels.template.disabled = true;

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueX = "index";
        series.dataFields.valueY = "rate";
        series.interpolationDuration = 500;
        series.strokeWidth = 1.5;
        series.strokeOpacity = 0.7;
        series.stroke = _this.chartColor.main;
        series.defaultState.transitionDuration = 500;
        series.tensionX = 0.8;
        //if you set series.tooltipText directly , you must also set the chart.cursor
        series.tooltipHTML = `
        <div style="color:var(--main-text-color);">
            <span class="font-bold">{rate}</span>
            <span>{tooltipDataItem.dataContext.formatUpdatedAt}</span>
        </div>
        `;
        series.tooltip.fontSize = 12;
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        //disable the cursor zoom
        chart.cursor.behavior = "none";
        series.tooltip.background.filters.clear();
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.opacity = 0.9;
        series.tooltip.background.fill = _this.chartColor.main;
        series.tooltip.background.stroke = am4core.color("rgba(0,0,0,0)");
        series.tooltip.background.cornerRadius = 5;
        //series bullets
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 1;
        bullet.circle.radius = 1;
        bullet.fill = _this.chartColor.main;
        var bullethover = bullet.states.create("hover");
        bullet.scale = chart.data.length > 1 ? 0 : 3;
        bullethover.properties.scale = chart.data.length > 1 ? 2 : 3;

        series.events.on("validated", function () {
            if (!series.dataItems.last) {
                return;
            }
            bullethover.properties.scale = chart.data.length > 1 ? 2 : 3;
            bullet.scale = chart.data.length > 1 ? 0 : 3;
        });
        chart.rateBullet = bullet;
        _this.chart = chart;
    }); // end am4core.ready()
}

function reDraw() {
    if (!this.chart) {
        return;
    }
    let chart = this.chart,
        series = chart.series.getIndex(0),
        rateBullet = chart.rateBullet;
    if (!series) {
        return;
    }
    series.stroke = this.chartColor.main;
    series.tooltip.background.fill = this.chartColor.main;
    rateBullet.fill = this.chartColor.main;
}
</script>
<style lang="scss">
@import "./priceCard.scss";
</style>