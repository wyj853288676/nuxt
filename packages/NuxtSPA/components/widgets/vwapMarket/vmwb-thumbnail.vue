<template>
    <div class="widget-thumbnail-container widget-vmwb-thumbnail-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1100" height="700">
            <style>
                .widget-panel {
                    fill: #eee;
                }

                .widget-panel-active {
                    fill: #ddd;
                }

                .widget-panel.sell-panel {
                    fill: #f56c6c;
                }

                .widget-panel.buy-panel {
                    fill: #67c23a;
                }

                .widget-panel-outline {
                    fill: transparent;
                    stroke-width: 1px;
                    stroke: #eee;
                }

                .widget-panel-sell.widget-panel-outline {
                    stroke: #f56c6c;
                }

                .widget-panel-buy.widget-panel-outline {
                    stroke: #67c23a;
                }
            </style>
            <rect class="widget-panel-active" width="200" height="60" x="70" y="60" rx="10" ry="10" />
            <rect class="widget-panel-active" width="200" height="60" x="70" y="170" rx="10" ry="10" />
            <rect class="widget-panel-active" width="200" height="60" x="70" y="280" rx="10" ry="10" />
            <rect class="widget-panel-active" width="200" height="60" x="70" y="390" rx="10" ry="10" />
            <rect class="widget-panel-active" width="200" height="60" x="70" y="500" rx="10" ry="10" />
            <rect class="widget-panel-active" width="200" height="60" x="70" y="610" rx="10" ry="10" />

            <rect class="widget-panel buy-panel" width="350" height="200" x="310" y="60" rx="10" ry="10" />
            <rect class="widget-panel sell-panel" width="350" height="200" x="680" y="60" rx="10" ry="10" />

            <rect class="widget-panel-buy widget-panel-outline" width="350" height="60" x="310" y="300" rx="10" ry="10" />
            <rect class="widget-panel-buy widget-panel-outline" width="350" height="60" x="310" y="400" rx="10" ry="10" />
            <rect class="widget-panel-buy widget-panel-outline" width="350" height="60" x="310" y="500" rx="10" ry="10" />
            <rect class="widget-panel-buy widget-panel-outline" width="350" height="60" x="310" y="600" rx="10" ry="10" />

            <rect class="widget-panel-sell widget-panel-outline" width="350" height="60" x="680" y="300" rx="10" ry="10" />
            <rect class="widget-panel-sell widget-panel-outline" width="350" height="60" x="680" y="400" rx="10" ry="10" />
            <rect class="widget-panel-sell widget-panel-outline" width="350" height="60" x="680" y="500" rx="10" ry="10" />
            <rect class="widget-panel-sell widget-panel-outline" width="350" height="60" x="680" y="600" rx="10" ry="10" />
        </svg>
    </div>
</template>
<script>
const themeStyles = require("./vmwbThumbnailStyles");
export default {
    data() {
        return {};
    },
    computed: {
        themeIndex:function(){
            return this.$store.state.themeIndex;
        },
        themes:function(){
            return this.$store.state.themes;
        },
        themeStyles: themeStyles,
    },
};
</script>

<style>
    .widget-vmwb-thumbnail-container{
        height: 65%;
    }
</style>
