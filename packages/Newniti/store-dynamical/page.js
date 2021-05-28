const $ = require("jquery");
const isMobile = (function (window) {
    return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
})(window);
if (isMobile) {
    $("body").addClass("is-mobile");
} else {
    $("body").addClass("is-pc");
}

export const state = () => ({
    isMobile: !!isMobile,
    locked: false,
    //document visibility; can be observed by "document.addEventlistener('visibilityChange',()=>document.visibilityState)"; 
    visibility: true,
});

export const getters = () => {

};
export const mutations = {
    lockPage: (state) => {
        $("body").attr('locked', true);
        state.locked = true;
    },
    unlockPage: (state) => {
        $("body").attr('locked', false);
        state.locked = false;
    },
    changeVisibility: (state) => {
        if (!window || !window.document) {
            return;
        }
        state.visibility = document.visibilityState;
    }
};