module.exports = function(){
    var colorList = this.themes[this.themeIndex].colorList;
    if(this.themeIndex == 0){
        return '';
    };
    var styles = [
        `.widget-panel{
            fill:${colorList.background.main};
        }`,
        `.widget-panel-active{
            fill:${colorList.widget.vice};
        }`,
        `.widget-panel.sell-panel{
            fill:${colorList.sell.main};
        }`,
        `.widget-panel.buy-panel{
            fill:${colorList.buy.main};
        }`,
    ];
    return styles.join(' ');
}