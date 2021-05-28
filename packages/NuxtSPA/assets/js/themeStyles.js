module.exports = function () {
    if (this.themeIndex === 0) {
        return "";
    };
    var theme = this.themes[this.themeIndex];
    var colorList = theme.colorList;
    var style = [
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
            background-color:${colorList.widget.vice} !important;
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
        // dashboard
        `div.nts-dashboard-panel-content{
            background:${colorList.widget.main};
            border-color:${colorList.background.vice};
        }`,
        `.nts-dashboard-panel.resizing .nts-dashboard-panel-resize-mask,
        .nts-dashboard-panel.dragging div.nts-dashboard-panel-content{
            border-color:${colorList.color.vice} !important;
        }`,
        `div.nts-dashboard-panel[status="1"] div.nts-dashboard-panel-content {
            border-color:${colorList.widget.vice};
            background-color:${colorList.background.vice};
        }`,
        `div.nts-dashboard-panel:hover div.nts-dashboard-panel-content, div.nts-dashboard-panel:hover div.nts-dashboard-panel-content::before{
            border-color:${colorList.widget.vice}
        }`,
        `div.nts-dashboard-panel-content:hover::before{
            color:${colorList.color.vice};
        }`,
        `.nts-dashboard-panel-content-body:hover::-webkit-scrollbar-thumb,
        .nts-dashboard-panel-content-body .el-table__body-wrapper::-webkit-scrollbar-thumb{
            background-color:${colorList.color.deep};
        }`,
        // dialog & compass
        `.el-dialog{
            background-color:${colorList.background.main};
        }`,
        `.nts-compass .el-button{
            background-color:${colorList.color.vice} !important;
            border-color:${colorList.color.vice} !important;
        }`,
        `div.nts-compass-card{
            background:${colorList.background.vice};
            border-color:${colorList.widget.vice};
            color:${colorList.color.main};
        }`,
        `div.nts-compass-card:hover{
            box-shadow:0px 0px 2px ${colorList.color.vice};
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
            box-shadow: 9PX 0PX 0px -5PX  inset ${colorList.color.vice} !important;
        }`,
        `.nts-theme-ul .el-menu-item:hover{
            box-shadow:9PX 0PX 0px -5PX ${colorList.color.vice} inset;
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
        `.el-table--striped .el-table__body tr.el-table__row--striped td,
        .el-table--striped .el-table__body tr.el-table__row--striped:hover td{
            background-color:${colorList.widget.vice};
        }`,
        `.el-table td, .el-table th.is-leaf{
            border-bottom:${colorList.widget.main};
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
    ];

    return style.join(" ");
};