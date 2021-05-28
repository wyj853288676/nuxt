module.exports = function(){
    var colorList = this.themes[this.themeIndex].colorList;
    var styles = [
        `.bg-buy{
            background-color:${colorList.buy.main};
        }`,
        `.bg-sell{
            background-color:${colorList.sell.main};
        }`,
        `.bg-buy-sell{
            background: linear-gradient(to right,${colorList.buy.main} 0 , ${colorList.buy.main} 50%,${colorList.sell.main} 50%,${colorList.sell.main} 100%);
        }
        .bg-sell-buy{
            background: linear-gradient(to left,${colorList.buy.main} 0 , ${colorList.buy.main} 50%,${colorList.sell.main} 50%,${colorList.sell.main} 100%);
        }`,
    ];
    return styles.join(' ');
}