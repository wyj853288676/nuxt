<template>
    <div class="widget-thumbnail-container widget-mp-thumbnail">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="700">
            <style>
                .widget-panel{
                    fill:#eee;
                }
                .widget-panel-active{
                    fill:#ddd;
                }
                .widget-panel.sell-panel{
                    fill:#f56c6c;
                }
                .widget-panel.buy-panel{
                    fill:#67c23a;
                }
            </style>
            <rect class="widget-panel sell-panel" width="250" height="250" x="310" y="40" rx="10" ry="10" />
            <rect class="widget-panel buy-panel" width="250" height="250" x="40" y="40" rx="10" ry="10" />
            <rect class="widget-panel widget-panel-active" width="520" height="100" x="40" y="310" rx="10" ry="10" />
            <rect class="widget-panel" width="520" height="100" x="40" y="430" rx="10" ry="10" />
            <rect class="widget-panel" width="520" height="100" x="40" y="550" rx="10" ry="10" />
        </svg>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
 
    },
    watch: {
      
    },
    mounted() {
    },
};
</script>
<style >
    .widget-mp-thumbnail{
        width: 75%;
    }
</style>
