<template>
    <div class="nwt-sidebar">
        <div class="nts-sidebar-content" :style="contentStyle" :active="active">
            <span @click="closeSidebar">
                <el-icon class="nwt-sidebar-close-icon el-icon-close"></el-icon>
            </span>
            <slot name="sidebarContent"> </slot>
        </div>
    </div>
</template>

<script>
const uiConfig = {
    liWidth: "3em",
    contentWidth: "250px",
};
export default {
    props: {
        config: {
            type: Object,
            default: function () {
                return {};
            },
        },
        active: {
            type: Boolean,
            default: () => true,
        },
    },
    data: function (context) {
        return {
            uiConfig: JSON.parse(JSON.stringify(uiConfig)),
            activeIndex: -1,
            defaultActive: false,
        };
    },
    computed: {
        contentStyle: function () {
            var style = [`width:${this.computedConfig.contentWidth}`];
            return style.join(";");
        },
        computedConfig: function () {
            return Object.assign(this.uiConfig, this.config);
        },

    },
    methods: {
        closeSidebar: function () {
        },

    },
};
</script>


<style lang="scss" scoped>
@import "./sidebar.scss";
</style>