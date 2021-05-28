<template>
    <div>
        <div class="chart-header">
            <slot name="chartHeader"></slot>
        </div>
        <div class="chart-container" style="width: 500px; height: 200px"></div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            defaultThemes: {
                color: "#555",
                columnColor: "#409EFF",
                dangerColor: "#f56c6c",
            },
        };
    },
    props: {
        maxY: {
            type: Number,
            default: function () {
                return null;
            },
        },
        chartDatas: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    computed: {
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
        datas: function () {
            return this.chartDatas.map(function (v, index) {
                return {
                    index: index + 1 + "",
                    delay: v.time,
                    timeout: v.timeout,
                };
            });
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
                columnColor:
                    this.themeIndex == 0
                        ? defaultThemes.columnColor
                        : themes.colorList.color.vice,
            };
            return Object.assign({}, defaultThemes, themes);
        },
    },
    mounted: function () {
        this.renderChart();
    },
    destroyed() {
        if (this.chart) {
            this.chart.dispose();
        }
    },
    watch: {
        datas: function () {
            this.renderChart();
        },
        themeIndex: function () {
            this.renderChart(true);
        },
    },
    methods: {
        renderChart: function () {
            var args = [...arguments];
            setTimeout(
                function (_this) {
                    render.call(_this, ...args);
                },
                0,
                this
            );
        },
    },
};
function render(reDraw = false) {
    var _this = this;
    if (this.chart && !reDraw) {
        if (!$(this.$el).is(":visible")) {
            return;
        }
        this.chart.data = this.datas;
        this.chart.validateData();
        return;
    } else if (this.chart) {
        this.chart.dispose();
    }
    var am4core = this.am4core,
        animationTheme = this.am4themes_animated,
        am4charts = this.am4charts,
        themes = this.chartThemes;
    am4core.useTheme(animationTheme);
    // Create chart instance
    var chart = am4core.create(
        this.$el.querySelector(".chart-container"),
        am4charts.XYChart
    );

    chart.color = am4core.color(themes.color);
    // Add data
    chart.data = this.datas;
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "index";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.location;
    categoryAxis.renderer.labels.template.fill = chart.color;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = chart.color;
    valueAxis.endValue = this.maxY;
    valueAxis.startValue = 0;
    valueAxis.title.text = "delay(ms)";
    valueAxis.title.fill = chart.color;
    valueAxis.adapter.add("max", function (defaultMax, axis) {
        var limitY = _this.maxY;
        if (limitY && limitY < defaultMax) {
            return limitY;
        }
        return defaultMax;
    });
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "delay";
    series.dataFields.categoryX = "index";
    series.name = "delay";
    series.columns.template.fillOpacity = 0.8;
    series.columns.template.fill = am4core.color(themes.columnColor);
    series.columns.template.adapter.add(
        "fill",
        function (defaultColor, column) {
            var dataContext = column.dataItem.dataContext;
            return dataContext.timeout
                ? am4core.color(themes.dangerColor)
                : defaultColor;
        }
    );
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 0;
    columnTemplate.strokeOpacity = 1;
    this.chart = chart;
    // end am4core.ready()
}
</script>
<style></style>
