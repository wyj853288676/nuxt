module.exports = function () {
    if (this.themeIndex === 0) {
        return "";
    };
    var theme = this.themes[this.themeIndex];
    var colorList = theme.colorList;
    var style = [
        `body{
            background-color:${colorList.widget.main};
        }`,
        `#__layout{
            padding:0px
        }`
    ]

    return style.join(" ");
};