<template >
    <i class="nts-light" :style="computedStyles"></i>
</template>
<script>
export default {
    props: {
        fill: {
            type: String,
            default: function () {
                return "#0d0";
            },
        },
        active: {
            type: Boolean,
            default: function () {
                return false;
            },
        },
    },
    computed: {
        computedStyles: function () {
            var styles = [
                `background-color:${this.active ? this.fill : ''}`,
            ];
            return styles.join(";");
        },
    },
};
</script>
<style lang="scss">
@import "./light.scss";
</style>