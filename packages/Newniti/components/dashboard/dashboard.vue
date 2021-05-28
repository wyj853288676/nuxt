<template>
    <transition-group :class="{'close-animation':closeAnimation}" name="dashboard-panel" @leave="onPanelLeave" tag="div" class="nwt-dashboard">
        <!-- Dont know why the computedStyle cant be applied to the dashboard-panel when it is the children of the transition-group -->
        <!-- Maybe Vue is observing the transform attribute when using the transition group,so I use a parent node to contain the dashboard-panel -->
        <div class="nwt-dashboard-panel-container" :class="`panle-${index}`" v-for="(panel, index) in computedPanels" :key="panel.key" :panel-dragging="panel.status === statusCode.DRAGGING">
            <div :panel-key="panel.key" :style="panelStyles[index]" class="nwt-dashboard-panel" :panel-dragging="panel.status === statusCode.DRAGGING">
                <base-widget :widget="panel.widget" :widgetMounted="widgetMounted" :panel-index="index">
                    <template v-slot:widget-header="slotProps">
                        <i v-if="slotProps.widget.popoutable" class="el-icon-copy-document el-icon cursor-pointer margin-horizon" @click="popoutPanel(index)"></i>
                        <i v-if="slotProps.widget.configable" class="el-icon el-icon-setting cursor-pointer margin-horizon"></i>
                        <i v-if="slotProps.widget.movable" class="el-icon el-icon-rank cursor-pointer margin-horizon panel-drag-icon cursor-grab"></i>
                        <i v-if="slotProps.widget.closable" class="el-icon el-icon-close cursor-pointer margin-horizon" @click="removePanel(index)"></i>
                    </template>
                </base-widget>
            </div>
        </div>
        <div class="nwt-dashboard-panel-container nwt-dashboard-panel-container-add" :key="'dashboard-panel-add-container'">
            <div v-show="computedPanels.length < limit" @click="addPanel()" class="nwt-dashboard-panel nwt-dashboard-panel-add" :key="'dashboard-panel-add'">
                <i class="el-icon-plus" style="font-size: 2em"></i>
            </div>
        </div>
    </transition-group>
</template>

<script>
const style = require("./style.js");
const DashboardPanel = require("@/assets/js/widget/DashboardPanel.js");
const PriceCard = require("@/assets/js/widget/priceCard.js");
const $ = require("jquery");
const { Matrix } = require("@/assets/js/Matrix.js");
export default {
    data() {
        return {
            statusCode: DashboardPanel.statusCode,
            closeAnimation: false,
            panelSorting: false,
            drag: {
                widget: null,
                panelIndex: null,
                panelObj: null,
                $panelDom: null,
                panelDomList: [],
                sortedPanelDomList: [],
                sortedPanels: [],
                averageHeight: 0,
                averageWidth: 0,
                limitX: 0,
                limitY: 0,
                realtimeIndex: 0,
                elOffsetTop: 0,
            },
        };
    },
    props: {
        panels: {
            type: Array,
            default: () => [],
        },
        limit: {
            type: Number,
            default: 10,
        },
    },
    computed: {
        draggingPanel: function () {
            return this.panels.filter(v => this.statusCode.DRAGGING);
        },
        computedPanels: function () {
            let results = [],
                panels = this.panels;
            for (let i = 0; i < panels.length; i++) {
                results[i] =
                    panels[i] instanceof DashboardPanel
                        ? panels[i]
                        : new DashboardPanel(Object.assign({}, panels[i]));
                panels[i] = results[i];
            }
            return results;
        },
        panelStyles: function () {
            let styles = [],
                panels = this.computedPanels;
            for (let i = 0; i < panels.length; i++) {
                let style = [`transform:${panels[i].transform.toString()}`];
                styles.push(style.join(";"));
            }
            return styles;
        },
    },
    methods: {
        addPanel: function () {
            this.panels.push({
                widget: new PriceCard(),
            });
        },
        removePanel: function (index) {
            let widget = document.querySelector(`[panel-index='${index}']`);
            if (widget && widget.myDragger) {
                widget.myDragger.destroy();
            }
            this.panels.splice(index, 1);
        },
        onPanelLeave: function (el, done) {
            let _el = $(el),
                _container = $(this.$el);
            _el.css({
                width: _el.outerWidth(),
                left: _el.offset().left - _container.offset().left,
                top: _el.offset().top - _container.offset().top,
            });
            _el.css("position", "absolute");
            setTimeout(function () {
                done();
            }, 500);
        },
        widgetMounted: function (el) {
            this.listenDrag(el);
        },
        popoutPanel: function () {

        },
        listenDrag: function (widget) {
            if (!widget) {
                return;
            }
            let panelIndex = Number($(widget).attr("panel-index")),
                panelObj = this.panels[panelIndex],
                _this = this;
            widget.myDragger = $(widget).find(".panel-drag-icon").myDrag({
                start: function (e) {
                    _this.drag.widget = widget;
                    panelIndex = _this.panels.indexOf(panelObj);
                    return _this.onDragStart(e, panelIndex);
                },
                move: function (e) {
                    _this.onDragMove(e, panelIndex);
                },
                end: function (e) {
                    _this.onDragEnd(e, panelIndex);
                },
                moveTarget: $("body")[0],
            })[0];
        },
        onDragStart: function (e, panelIndex) {
            let panelObj = this.panels[panelIndex],
                $el = $(this.$el),
                $panelDom = $(this.drag.widget).parent();
            if (!panelObj || this.panelSorting) {
                return false;
            }
            let cols = Math.floor($el.innerWidth() / $panelDom.outerWidth()),
                rows = Math.ceil(this.panels.length / cols);
            this.drag.realtimeIndex = panelIndex;
            panelObj.status = DashboardPanel.statusCode.DRAGGING;
            this.drag.sortedPanelDomList = Array.from($el[0].querySelectorAll(".nwt-dashboard-panel-container:not(.nwt-dashboard-panel-container-add)"));
            this.drag.sortedPanels = Array.from(this.panels);
            this.drag.panelDomList = Array.from(this.drag.sortedPanelDomList);
            this.drag.averageHeight = $panelDom.outerHeight();
            this.drag.averageWidth = $panelDom.outerWidth();
            this.drag.cols = cols;
            this.drag.rows = rows;
            this.drag.elOffsetTop = $el.offset().top;
            this.$set(this.panels, panelIndex, panelObj);
        },
        onDragMove: function (e, panelIndex) {
            e.preventDefault();
            let panelObj = this.panels[panelIndex],
                averageHeight = this.drag.averageHeight,
                averageWidth = this.drag.averageWidth,
                cols = this.drag.cols,
                rows = this.drag.rows,
                sortedPanelDomList = this.drag.sortedPanelDomList,
                sortedPanels = this.drag.sortedPanels,
                panelDomList = this.drag.panelDomList,
                realtimeIndex = this.drag.realtimeIndex,
                $el = $(this.$el);
            if (!panelObj) {
                return false;
            }
            //transform the panel
            let offsetTop = $el.offset().top;
            panelObj.transform = panelObj.transform.multi(new Matrix(1, 0, 0, 1, e.myDragX, e.myDragY + this.drag.elOffsetTop - offsetTop));
            this.drag.elOffsetTop = offsetTop;
            let remainderX = panelObj.transform.e % averageWidth,
                remainderY = panelObj.transform.f % averageHeight;
            let moveX = parseInt(panelObj.transform.e / averageWidth) + (remainderX > 0 ? 1 : -1) * (Math.abs(remainderX) > 60 ? 1 : 0),
                moveY = parseInt(panelObj.transform.f / averageHeight) + (remainderY > 0 ? 1 : -1) * (Math.abs(remainderY) > 40 ? 1 : 0);
            if (moveX < (-panelIndex % cols) || moveX >= (cols - panelIndex % cols)) {
                return;
            }
            let calIndex = moveX + moveY * cols + panelIndex;
            if (calIndex < -1 || calIndex > this.panels.length) {
                return;
            }
            calIndex = Math.max(0, Math.min(this.panels.length - 1, calIndex));

            if (realtimeIndex === calIndex || (calIndex - this.panels.length) >= 1 || calIndex <= -1) {
                return;
            }

            //update the sortedPanelDomList
            let direction = calIndex > realtimeIndex ? 1 : -1;
            sortedPanelDomList.splice(calIndex, 0, sortedPanelDomList.splice(realtimeIndex, 1)[0]);
            sortedPanels.splice(calIndex, 0, sortedPanels.splice(realtimeIndex, 1)[0]);
            for (let i = realtimeIndex; i != calIndex; i += direction) {
                let originPanel = panelDomList[i],
                    targetPanel = sortedPanelDomList[i],
                    gapX = $(originPanel).offset().left - $(targetPanel).offset().left,
                    gapY = $(originPanel).offset().top - $(targetPanel).offset().top;
                sortedPanels[i].transform = new Matrix(1, 0, 0, 1, gapX, gapY);
            }

            this.drag.realtimeIndex = realtimeIndex = calIndex;

        },
        onDragEnd: function (e, panelIndex) {
            let panelObj = this.panels[panelIndex];
            if (!panelObj) {
                return false;
            }
            panelObj.status = DashboardPanel.statusCode.DEFAULT;
            let realtimeIndex = this.drag.realtimeIndex;
            let originPanel = this.drag.panelDomList[panelIndex],
                targetPanel = this.drag.panelDomList[realtimeIndex],
                sortedPanels = this.drag.sortedPanels,
                gapX = $(targetPanel).offset().left - $(originPanel).offset().left,
                gapY = $(targetPanel).offset().top - $(originPanel).offset().top;
            //set the transform attribute of the panel
            panelObj.transform = new Matrix(1, 0, 0, 1, gapX, gapY);
            this.panelSorting = true;
            let _this = this;
            setTimeout(function () {
                _this.closeAnimation = true;
                panelObj.status = DashboardPanel.statusCode.DEFAULT;
                //set the panels order;
                for (let i = 0; i < sortedPanels.length; i++) {
                    sortedPanels[i].transform = new Matrix();
                    _this.$set(_this.panels, i, sortedPanels[i]);
                };
                requestAnimationFrame(() => {
                    _this.closeAnimation = false;
                    _this.panelSorting = false;
                });
            }, 300);
        },
    },
    mounted: function () {
        this.$store.commit("theme/addStyle", style);
    },
};
</script>
<style lang="scss">
@import "./dashboard.scss";
</style>
