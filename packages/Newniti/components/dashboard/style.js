module.exports = function() {
    let theme = this.theme.themes[this.theme.themeIndex],
        colorList = theme.colorList,
        styles = [
            `.nwt-dashboard-panel{
                background-color: ${colorList.widget.main};
            }`,
            `.nwt-dashboard-panel.nwt-dashboard-panel-add:hover{
                color: ${colorList.color.vice};
                border-style: solid;
            }`,
            `.nwt-dashboard-panel[panel-dragging='true']{
                box-shadow:0px 0px 0px 2px ${colorList.color.vice};
            }`
        ];
    return styles.join(" ");
};