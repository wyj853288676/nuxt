<template>
    <component
        ref="component"
        v-if="componentId != null"
        :is="componentId"
        class="nts-widget-thumbnail"
    ></component>
</template>


<script>
const thumbnailStyles = require("./thumbnailStyles.js");
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
    computed: {
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
        themes: function () {
            return this.$store.state.themes;
        },
        baseThemeStyles: thumbnailStyles,
        themeStyles: function () {
            var component = this.$refs["component"];
            if (component.themeStyles) {
                return this.baseThemeStyles + component.themeStyles;
            } else {
                return this.baseThemeStyles;
            }
        },
    },
    watch: {
        themeIndex: function () {
            this.changeStyleByTheme();
        },
    },
    mounted() {
        this.changeStyleByTheme();
        this.resizeSvg();
    },
    methods: {
        changeStyleByTheme: function () {
            var StyleNode = this.StyleNode;
            if (this.style === undefined) {
                this.style = new StyleNode({
                    parentNode: this.$el.querySelector("svg"),
                });
            }
            var style = this.style;
            style.write(this.themeStyles);
        },
        resizeSvg: function () {
            var $el = $(this.$el),
                component = this.$refs["component"],
                $svg = $el.find("svg");
            var scaleX =
                    $el.outerWidth() / $svg.outerWidth(),
                scaleY =
                    $el.outerHeight() / $svg.outerHeight();
            if (component.isSquare === true) {
                scaleX = scaleY;
            }
            var matrix = new Matrix(scaleX, 0, 0, scaleY, 0, 0);
            $svg.css("transform", matrix.toString());
        },
    },
};
</script>
<style lang='scss' >
.nts-widget-thumbnail svg {
    transform-origin: 0% 0%;
}
.widget-thumbnail {
    overflow: hidden;
    width: 60%;
    height: 80%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nts-widget-thumbnail {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5%;
}
body[theme='default']{
    .nts-widget-thumbnail{
        background:transparent;
        border:1px solid #eee;
    }
}
</style>