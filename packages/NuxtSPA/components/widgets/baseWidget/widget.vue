<template>
    <component
        ref="component"
        v-if="componentId != null"
        :is="componentId"
        class="nts-widget"
    ></component>
</template>


<script>
const themeStyles = require("./widgetStyles");
export default {
    props: {
        componentId: {
            type: String,
            default: function () {
                return null;
            },
        },
    },
    data() {
        return {};
    },
    mounted() {
        this.$store.commit("addStyles", themeStyles);
    },

    methods: {
        configWidget: function () {
            var component = this.$refs["component"];
            component.status = "config";
            if (typeof component.configWidget === "function") {
                component.configWidget();
            }
        },
        onResize: function () {
            var component = this.$refs["component"];
            if (typeof component.onResize === "function") {
                component.onResize();
            }
        },
    },
};
</script>

<style lang='scss'>
.nts-widget {
    .el-input__inner,
    .el-input__icon {
        line-height: 25px;
    }
    .el-input__suffix .el-icon-arrow-up:before {
        transform: scale(0.8);
        display: inline-block;
    }
    .input-title {
        line-height: 25px;
    }
}

</style>