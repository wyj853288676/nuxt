module.exports = function() {
    if (this.themeIndex === 0) {
        return "";
    };
    let themeStore = this.theme,
        commonColors = themeStore.commonColors,
        theme = themeStore.themes[themeStore.themeIndex],
        colorList = theme.colorList,
        style = [
            //css variable declare
            `:root{
                --main-background-color: ${colorList.background.main};
                --vice-background-color: ${colorList.background.vice};
                --main-text-color: ${colorList.color.main};
                --vice-text-color: ${colorList.color.vice};
                --buy-color:${colorList.buy.main};
                --sell-color:${colorList.sell.main};
                --common-danger:${commonColors.danger};
                --common-success:${commonColors.success};
                --common-warning:${commonColors.warning};
                --common-info:${commonColors.info};
            }`,
            `.ant-layout,.ant-layout-footer{
                background:${colorList.background.main};
                color:inherit;
            }`,
            `body{
                background-color:${colorList.background.main};   
                color:${colorList.color.main};
            }`,
            // tab
            `.el-tabs--border-card>.el-tabs__header{
                background:transparent;
                border:none;
            }`,
            `el-tabs__content{
                background:${colorList.background.vice};
            }`,
            `.el-tabs--border-card{
                border:none;
                background-color:transparent;
                box-shadow:none;
            }`,
            `.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
                color:${colorList.color.vice};
                opacity:1 !important;
            }`,
            `.el-tabs--border-card>.el-tabs__header .el-tabs__item:not([aria-controls='pane-add']){
                border:none !important;
                background-color:${colorList.background.vice} ;
                margin-right: 10px;
            }`,
            `.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover,.el-icon:hover,.el-icon.hover{
                color:${colorList.color.vice} !important;
            }`,
            //uiConfig form
            `ul.nts-sidebar-ul li.active .el-button,
             ul.nts-sidebar-ul .el-button:hover,
             ul.nts-sidebar-ul .el-button:focus{
                background-color:${colorList.color.light} !important;
                color:${colorList.color.vice} !important;
            }`,
            `.nts-theme-ul .el-menu-item[theme-active=true]{
                background-color:${colorList.color.light};
                box-shadow: 9PX 0PX 0px -7PX  inset ${colorList.color.vice} !important;
            }`,
            `.nts-theme-ul .el-menu-item:hover{
                box-shadow:9PX 0PX 0px -7PX ${colorList.color.vice} inset;
            }`,
            // form
            `.el-select .el-input.is-focus .el-input__inner,
            .el-select .el-input .el-input__inner:hover,
            .el-select:hover .el-input__inner,
            .el-checkbox__input.is-focus .el-checkbox__inner,
            .el-checkbox__inner:hover,
            .el-select .el-input .el-input__inner:focus{
                border-color:${colorList.color.vice} !important;
            }`,
            `.el-input__inner{
                color:${colorList.color.main};
            }`,
            `.el-select-dropdown__item.selected{
                color:${colorList.color.vice};
            }`,
            `.el-button--primary.is-plain{
                background-color:transparent;
            }`,
            `.el-button--primary,
            .el-button--primary:hover,
            .el-button--primary:focus,
            .el-button--primary.is-plain,
            .el-button--primary.is-plain:hover,
            .el-button--primary.is-plain:focus  {
                border-color: ${colorList.color.vice};
                color:${colorList.color.main}
            }`,
            `.el-button--primary,
            .el-button--primary:hover,
            .el-button--primary:focus,
            .el-button--primary.is-plain:hover,
            .el-button--primary.is-plain:focus  {
                background-color: ${colorList.color.vice};
            }`,
            `.el-checkbox__input.is-checked+.el-checkbox__label{
                color:${colorList.color.vice};
            }`,
            `.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                background-color:${colorList.color.vice};
                border-color:${colorList.color.vice};
            }`,
            `.el-tooltip__popper.is-dark{
                background-color:${colorList.color.vice};
            }`,
            `.el-tooltip__popper[x-placement^=top] .popper__arrow,
            .el-tooltip__popper[x-placement^=top] .popper__arrow::after{
                border-top-color:${colorList.color.vice};
            }`,
            //table
            `.el-table th, .el-table tr{
                background-color:${colorList.background.main};
            }`,
            `.el-table--enable-row-hover .el-table__body tr:hover>td{
                background-color: initial;
            }`,
            //link
            `.el-link.el-link--default{
                color:${colorList.color.main};
            }`,
            `.el-link.el-link--default:hover{
                color:${colorList.color.vice};
            }`,
            `.el-link.is-underline:hover:after{
                border-bottom-color:${colorList.color.vice};
            }`,
            //popover
            `body:not([theme='default']) .server-delay-popover{
                background-color:${colorList.background.vice} !important;
                border-color:${colorList.color.vice}  !important;
            }`,
            `body:not([theme='default'])  .server-delay-popover .popper__arrow{
                border-bottom-color:${colorList.color.vice} !important;
            }
            body:not([theme='default'])  .server-delay-popover .popper__arrow::after{
                border-bottom-color:${colorList.background.vice} !important;
            }
            `,
            //loading svg
            `.el-loading-spinner .path{
                stroke: ${colorList.color.vice};
            }`
        ];

    return style.join(" ");
};