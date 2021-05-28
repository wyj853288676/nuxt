<template>
    <div class="credit-status-thumbnail-container widget-thumbnail-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="700">
            <style>
                .widget-panel {
                    fill: rgba(0, 0, 0, 0.05);
                }

                .widget-panel-active {
                    fill: #ddd;
                }
            </style>
            <rect class="widget-panel-active" width="580" height="80" x="10" y="60" rx="10" ry="10" />

            <rect class="widget-panel" width="580" height="70" x="10" y="175" rx="10" ry="10" />
            <circle cx="40" cy="210" r="16" stroke="transparent" stroke-width="0" fill="#F56C6C" />

            <rect class="widget-panel" width="580" height="70" x="10" y="255" rx="10" ry="10" />
            <circle cx="40" cy="290" r="16" stroke="transparent" stroke-width="0" fill="#E6A23C" />

            <rect class="widget-panel" width="580" height="70" x="10" y="335" rx="10" ry="10" />
            <circle cx="40" cy="370" r="16" stroke="transparent" stroke-width="0" fill="#67C23A" />

            <rect class="widget-panel" width="580" height="70" x="10" y="415" rx="10" ry="10" />
            <circle cx="40" cy="450" r="16" stroke="transparent" stroke-width="0" fill="#409EFF" />

            <rect class="widget-panel" width="580" height="70" x="10" y="495" rx="10" ry="10" />
            <circle cx="40" cy="530" r="16" stroke="transparent" stroke-width="0" fill="#ea6cf5" />

            <rect class="widget-panel" width="580" height="70" x="10" y="575" rx="10" ry="10" />
            <circle cx="40" cy="610" r="16" stroke="transparent" stroke-width="0" fill="#909399" />
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSquare: true,
        };
    },
};
</script>

<style lang="scss" scoped>
.credit-status-thumbnail-container {
    padding-left: 5%;
}
</style>
