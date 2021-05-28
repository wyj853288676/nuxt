<template>
    <div class="widget-cpg-thumbnail">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="700">
            <style>
                .widget-path {
                    stroke: #67c23a;
                    stroke-width: 4px;
                    fill: transparent;
                }
        
                .widget-path-curve {
                    stroke: #f56c6c;
                }
            </style>
            <path class='widget-path' d="M 20 348 h 960" />
            <path class='widget-path-curve widget-path'
                d="M60 450 Q 170 100, 280 348  T 500 348 Q 600 100, 700 250 T 940 100" />
        </svg>
    </div>
</template>
<script>
    const themeStyles = require("./themeStyles");
    export default {
        data() {
            return {

            }
        },
        computed: {
            themes: function() {
                return this.$store.state.themes;
            },
            themeIndex: function() {
                return this.$store.state.themeIndex;
            },
            themeStyles: themeStyles,
        }
    }
</script>
<style lang="scss">
    .widget-cpg-thumbnail {
        height: 65%;
    }
</style>