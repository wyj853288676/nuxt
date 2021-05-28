<template>
    <div style="height: 100%">
        <div class="chart-container" style="height: 90%"></div>
    </div>
</template>

<script>
const mockDatas = require("./mockChartDatas");

export default {
    data: function () {
        return {
            defaultThemes: {},
        };
    },
    computed: {
        chartDatas: function () {
            return mockDatas;
        },
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
        themes: function () {
            return this.$store.state.themes[this.themeIndex];
        },
        chartThemes: function () {
            var themes = this.themes,
                defaultThemes = this.defaultThemes,
                chartThemes = {};
            themes = {
                color: themes.colorList.color.main,
                vice: themes.colorList.color.vice
                    ? themes.colorList.color.vice
                    : "gray",
                up: "#f56c6c",
                down: "#67c23a",
            };
            return Object.assign({}, defaultThemes, themes);
        },
    },
    methods: {
        onResize: function () {},
    },
    mounted() {
        renderChart.call(this);
    },
    destroyed() {
        if (this.chart) {
            this.chart.dispose();
        }
    },
    watch: {
        themeIndex: function () {
            renderChart.call(this, true);
        },
    },
};

function renderChart(reDraw = false) {
    if (!$(this.$el).is(":visible")) {
        return;
    }
    if (this.chart && !reDraw) {
        this.chart.data = this.chartDatas;
        this.chart.validateData();
        return;
    }
    if (this.chart) {
        this.chart.dispose();
    }
    var am4core = this.am4core,
        animationTheme = this.am4themes_animated,
        am4charts = this.am4charts,
        themes = this.chartThemes;
    // Themes begin
    am4core.useTheme(animationTheme);
    // Themes end

    var chart = am4core.create(
        this.$el.querySelector(".chart-container"),
        am4charts.XYChart
    );
    this.chart = chart;
    chart.data = this.chartDatas;
    chart.paddingRight = 20;

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    var series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.simplifiedProcessing = true;

    chart.cursor = new am4charts.XYCursor();

    // a separate series for scrollbar
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;
}
</script>

<style></style>
