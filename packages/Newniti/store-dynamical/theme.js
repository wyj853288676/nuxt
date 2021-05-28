import themesConfig from '../assets/js/themes.js';
import StyleNode from '@/assets/js/styleNode';
const $ = require("jquery");
const commonStyle = require("@/assets/js/themeStyle");
const basePath = "theme";
const styleNode = new StyleNode({
    parentNode: document.querySelector('body'),
});

export const state = () => ({
    //themes
    themeIndex: 0,
    colorTags: themesConfig.colorTags,
    themes: themesConfig.themes,
    themeStyles: [
        commonStyle,
    ],
    commonColors: {
        success: "#67C23A",
        danger: "#F56C6C",
        warning: "#E6A23C",
        info: "#909399",
    },

});

export const mutations = {
    changeTheme(state, themeIndex) {
        if (state.themes[themeIndex] === undefined) {
            return;
        }
        state.themeIndex = themeIndex;
        $('body').attr('theme', state.themes[themeIndex].name);
        this.commit(`${basePath}/applyStyle`);
    },
    addStyle: function (state, styleGetter) {
        if (typeof styleGetter != 'function') {
            console.error(`addStyle styleGetter must be a function`);
            return false;
        } else if (state.themeStyles.indexOf(styleGetter) >= 0) {
            return false;
        }
        state.themeStyles.push(styleGetter);
        console.log('new style has been pushed into themeStyle');
        this.commit(`${basePath}/applyStyle`);
    },
    removeStyle: function (state, styleGetter) {
        if (typeof styleGetter === 'function') {
            var index = state.themeStyles.indexOf(styleGetter);
            state.themeStyles.splice(index, 1);
        } else if (typeof styleGetter === 'number') {
            state.themeStyles.splice(styleGetter, 1);
        }
    },
    applyStyle: function (state) {
        var styleList = [],
            themeStyles = state.themeStyles;
        for (var i = 0; i < themeStyles.length; i++) {
            var styleGetter = themeStyles[i];
            if (styleGetter) {
                styleList.push(styleGetter.call(this.state));
            }
        }
        styleNode.write(styleList.join(''));
    },
}