<template>
    <div class="">
        <el-menu
            :default-active="String(themeIndex)"
            class="nts-theme-ul"
            active-text-color="inherit"
        >
            <el-menu-item-group>
                <template slot="title">Select theme</template>
                <el-menu-item
                    @click="liClick(index)"
                    v-for="(theme, index) in themes"
                    :key="index"
                    :theme-active="index == themeIndex"
                >
                    <div class="h3">
                        {{ theme.name }}
                    </div>
                    <div>
                        <i
                            v-for="(color, name) in theme.colorList"
                            :key="name"
                            :title="color.title ? color.title : name"
                            class="nts-theme-icon"
                            :style="themeIconStyles[index][name]"
                            v-if="color.visible != false && Object.keys(color).length > 0"
                        >
                        </i>
                    </div>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </div>
</template>

<script>
export default {
    methods: {
        liClick: function (index) {
            this.$store.commit("changeTheme", index);
        },
        getGradientColor: function (startColor, endColor) {
            return `background:linear-gradient(135deg,${startColor} 0%,${startColor} 50%,${endColor} 50%,${endColor} 100%);background-color:${startColor}`;
        },
    },
    computed: {
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
            return this.state.themeIndex;
        },
        state: function () {
            return this.$store.state;
        },
        themes: function () {
            var themes = this.state.themes,
                themeIndex = this.state.themeIndex,
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