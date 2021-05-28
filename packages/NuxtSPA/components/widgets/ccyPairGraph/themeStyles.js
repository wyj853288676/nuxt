module.exports = function() {
    var colorList = this.themes[this.themeIndex].colorList;
    var styles = [
        `.widget-path {
            stroke: ${colorList.buy.main};
        }
        .widget-path-curve {
            stroke: ${colorList.sell.main};
        }`
    ];
    return styles.join(' ');
}