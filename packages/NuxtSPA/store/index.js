import themesConfig from '../assets/js/themes.js';
import widgetsList from '../assets/js/widgets.js';
import StyleNode from '@/assets/js/styleNode';
const commonStyles = require("../assets/js/themeStyles");

const styleNode = new StyleNode({
    parentNode: document.querySelector('body'),
});



export const state = () => ({
    //themes
    defaultThemeIndex: 2,
    themeIndex: 0,
    colorTags: themesConfig.colorTags,
    themes: themesConfig.themes,
    themeStyles: [
        commonStyles,
    ],
   
    //page is locked or not
    pageLocked: false,
   
    //all widgets
    widgets: widgetsList,

});

export const mutations = {
    changeTheme(state, themeIndex) {
        if (state.themes[themeIndex] === undefined) {
            return;
        }
        state.themeIndex = themeIndex;
        $('body').attr('theme', state.themes[themeIndex].name);
        this.commit('applyStyles');
    },
    addStyles: function (state, styleGetter) {
        if (typeof styleGetter != 'function') {
            console.error(`addStyles styleGetter must be a function`);
            return false;
        } else if (state.themeStyles.indexOf(styleGetter) >= 0) {
            return false;
        }
        state.themeStyles.push(styleGetter);
        console.log('new styles has been pushed into themeStyles');
        this.commit('applyStyles');
    },
    removeStyles: function (state, styleGetter) {
        if (typeof styleGetter === 'function') {
            var index = state.themeStyles.indexOf(styleGetter);
            state.themeStyles.splice(index, 1);
        } else if (typeof styleGetter === 'number') {
            state.themeStyles.splice(styleGetter, 1);
        }
    },
    applyStyles: function (state) {
        var styles = [],
            themeStyles = state.themeStyles;
        for (var i = 0; i < themeStyles.length; i++) {
            var styleGetter = themeStyles[i];
            styles.push(styleGetter.call(this.state));
        }
        styleNode.write(styles.join(''));
    },
    lockPage: function (state) {
        state.pageLocked = true;
        $('body').attr('locked', 'true');
    },
    unlockPage: function (state) {
        state.pageLocked = false;
        $('body').attr('locked', 'false');
    }
}