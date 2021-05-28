module.exports = function() {
    var colorList = this.themes[this.themeIndex].colorList;
    var styles = [
        `.widget-panel-sell.widget-panel-outline {
            stroke: ${colorList.sell.main};
        }
        .widget-panel-buy.widget-panel-outline {
            stroke: ${colorList.buy.main};
        }`,
    ];
    return styles.join('');
}