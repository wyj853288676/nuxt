<template>
    <div class="widget-cps-thumbnail">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="700">
            <style>
                .widget-panel {
                    fill: #eee;
                }
                .widget-panel {
                    fill: #ddd;
                }
                .widget-panel.sell-panel {
                    fill: #f56c6c;
                }
                .widget-panel.buy-panel {
                    fill: #67c23a;
                }
            </style>

            <rect class="widget-panel-active" width="420" height="70" x="30" y="50" rx="10" ry="10" />
            <rect class="widget-panel" width="420" height="70" x="30" y="180" rx="10" ry="10" />
            <rect class="widget-panel" width="420" height="70" x="30" y="310" rx="10" ry="10" />
            <rect class="widget-panel" width="420" height="70" x="30" y="440" rx="10" ry="10" />
            <rect class="widget-panel" width="420" height="70" x="30" y="570" rx="10" ry="10" />

            <rect class="widget-panel sell-panel" width="220" height="220" x="500" y="40" rx="10" ry="10" />
            <rect class="widget-panel buy-panel" width="220" height="220" x="750" y="40" rx="10" ry="10" />
            <rect class="widget-panel-active" width="470" height="70" x="500" y="300" rx="10" ry="10" />
            <rect class="widget-panel" width="470" height="70" x="500" y="440" rx="10" ry="10" />
            <rect class="widget-panel" width="470" height="70" x="500" y="580" rx="10" ry="10" />
        </svg>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.widget-cps-thumbnail {
    height: 65%;
}
</style>
