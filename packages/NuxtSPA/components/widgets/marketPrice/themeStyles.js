module.exports = function(){
    var colorList = this.themes[this.themeIndex].colorList;
    var styles = [
        `.buy-sell-card-container .bs-card:hover .card-title, 
        .buy-sell-card-container .bs-card:hover .card-content{
            border-color:${colorList.color.vice};
        }`,
        `.buy-sell-card-container .bs-card:hover .card-content::after{
            background-color:${colorList.color.vice};
        }`
    ];
    return styles.join(' ');
}