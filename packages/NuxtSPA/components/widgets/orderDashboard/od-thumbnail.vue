<template>
    <div class="widget-od-thumbnail">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="380">
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
            </style>

            <rect class="widget-panel" width="920" height="70" x="40" y="40" />
            <rect class="widget-panel-active" width="920" height="70" x="40" y="110" />
            <rect class="widget-panel" width="920" height="70" x="40" y="180" />
            <rect class="widget-panel-active" width="920" height="70" x="40" y="250" />

            <rect class="widget-panel sell-panel" width="20" height="60" x="50" y="45" rx="10" ry="10" />
            <rect class="widget-panel sell-panel" width="20" height="60" x="50" y="115" rx="10" ry="10" />
            <rect class="widget-panel sell-panel" width="20" height="60" x="50" y="185" rx="10" ry="10" />
            <rect class="widget-panel buy-panel" width="20" height="60" x="50" y="255" rx="10" ry="10" />
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style>
.widget-od-thumbnail {
    height: 60%;
}
</style>
