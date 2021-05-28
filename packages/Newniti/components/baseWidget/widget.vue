<template>
    <div class="nwt-widget">
        <div class="nwt-widget-header">
            <div class="nw-widget-header-title">
                {{ widget.title }}
            </div>
            <div class="nwt-widget-header-slot">
                <slot name="widget-header" :widget="widget"> </slot>
            </div>
        </div>
        <div class="nwt-widget-content">
            <component
                ref="component"
                v-if="widget.name"
                :is="widget.name"
                :widget="widget"
            >
            </component>
        </div>
    </div>
</template>
<script>
const BaseWidget = require("@/assets/js/widget/baseWidget.js");
export default {
    props: {
        // widget must be a object which is an instance of a class that extends the BaseWidget
        widget: {
            type: BaseWidget,
            default: () => {},
        },
        widgetMounted: {
            type: Function,
            default: null,
        },
    },
    methods: {},
    mounted: function () {
        if (this.widgetMounted) {
            this.widgetMounted(this.$el, this.widget);
        }
    },
};
</script>
<style lang='scss'>
.nwt-widget {
    height: 100%;
    position: relative;
}
.nwt-widget > .nwt-widget-header {
    display: grid;
    grid-template: 1fr / auto auto;
    overflow: hidden;
    height: 1.5em;
    position: absolute;
    left: 0;
    right: 0;
}
.nwt-widget-header-slot {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
    transition: all 0.3s;
    opacity: 0;
    transform: translateY(-10px);
}
.nwt-widget:hover .nwt-widget-header-slot {
    transform: translateY(0);
    opacity: 1;
}
.nwt-widget-content {
    height: calc(100%);
    padding-top: 1.5em;
}
</style>