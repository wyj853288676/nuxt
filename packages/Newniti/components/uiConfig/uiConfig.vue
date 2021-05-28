<template>
    <div class="">
        <el-menu
            :default-active="String(themeIndex)"
            class="nts-theme-ul"
            active-text-color="inherit"
        >
            <el-menu-item-group>
                <el-menu-item
                    @click="liClick(index)"
                    v-for="(theme, index) in themes"
                    :key="index"
                    :theme-active="index == themeIndex"
                    style="padding-left: 8px; padding-right: 5px"
                >
                    <div>
                        {{ theme.name }}
                    </div>
                    <div>
                        <i
                            v-for="(color, name) in filterColorList"
                            :key="name"
                            :title="color.title ? color.title : name"
                            class="nts-theme-icon"
                            :style="themeIconStyles[index][name]"
                        >
                        </i>
                    </div>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </div>
</template>

<script>
const $ = require("jquery");
export default {
    methods: {
        liClick: function (index) {
            this.$store.commit("theme/changeTheme", index);
        },
        getGradientColor: function (startColor, endColor) {
            return `background:linear-gradient(135deg,${startColor} 0%,${startColor} 50%,${endColor} 50%,${endColor} 100%);background-color:${startColor}`;
        },
    },
    computed: {
        filterColorList: function () {
            let result = {},
                theme = this.themes[this.themeIndex];
            for (var key in theme.colorList) {
                let v = theme.colorList[key];
                if (v.visible != false && Object.keys(v).length) {
                    result[key] = v;
                }
            }
            return result;
        },
        themeIconStyles: function () {
            var styles = [],
                themes = this.themes;
            for (var i = 0; i < themes.length; i++) {
                var theme = themes[i];
                var style = {};
                for (var j in theme.colorList) {
                    var colorSet = theme.colorList[j];
                    style[j] = this.getGradientColor(
                        colorSet.main,
                        colorSet.vice
                    );
                }
                styles.push(style);
            }
            return styles;
        },
        themeIndex: function () {
            return this.state.theme.themeIndex;
        },
        state: function () {
            return this.$store.state;
        },
        themes: function () {
            var themes = this.state.theme.themes,
                themeIndex = this.state.theme.themeIndex,
                configs = [];
            for (var i = 0; i < themes.length; i++) {
                var config = themes[i];
                configs.push(config);
            }
            return configs;
        },
    },
};
</script>

<style lang="scss">
@import "./uiConfig.scss";
</style>