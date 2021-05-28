<template>
    <div
        class="nts-dashboard"
        :style="dashboardStyle"
        :class="{ 'no-transition': closeAnimation }"
    >
        <template v-for="(panels, indexX) in matrix">
            <div
                v-for="(panel, indexY) in panels"
                class="nts-dashboard-panel"
                :style="panelStyles[indexX][indexY]"
                status="0"
                :key="getPanelKey(indexX, indexY)"
            >
                <div
                    @click="panelClick(panel, $event)"
                    class="nts-dashboard-panel-content"
                ></div>
            </div>
        </template>
        <transition-group tag="div" leave-active-class="nts-fade-out">
            <div
                v-for="panel in computedPanels"
                :class="{ dragging: panel.dragging, resizing: panel.resizing }"
                class="nts-dashboard-panel"
                :style="computedPanelStyles[panel.index]"
                :status="panel.status"
                :key="panel.key"
            >
                <div class="nts-dashboard-panel-content">
                    <el-row class="nts-dashboard-panel-content-header">
                        <el-col  :span='6' class="nts-dashboard-panel-title">
                             <slot
                                name="panelTitle"
                                v-bind:panel="panel"
                            ></slot>
                        </el-col >
                        <el-col :span='18'  class="nts-dashboard-panel-editors">
                            <slot
                                name="panelEditor"
                                v-bind:panel="panel"
                            ></slot>
                            <i
                                :data-x="panel.x"
                                :data-y="panel.y"
                                :data-index="panel.index"
                                class="el-icon-rank el-icon cursor-grab margin-horizon"
                                grab-icon="true"
                            >
                            </i>
                            <i
                                @click.stop="releasePanel(panel.x, panel.y)"
                                class="el-icon-close el-icon cursor-pointer margin-horizon cursor-pointer"
                            ></i>
                        </el-col >
                    </el-row>
                    <div class="nts-dashboard-panel-content-body">
                        <slot
                            name="panelBody"
                            v-bind:panelType="panel.panelType"
                            v-bind:panel="panel"
                        ></slot>
                    </div>
                    <!-- resize panel -->
                    <template v-if="panel.resizeable">
                        <div
                            :style="resizeMaskStyles[panel.index]"
                            :data-x="panel.x"
                            :data-y="panel.y"
                            :data-index="panel.index"
                            class="nts-dashboard-panel-resize-mask"
                        >
                            <div
                                class="nts-dashboard-panel-resize-bar resize-down"
                                data-direction="down"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-up"
                                data-direction="up"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-left"
                                data-direction="left"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-right"
                                data-direction="right"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-right-up"
                                data-direction="right-up"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-right-down"
                                data-direction="right-down"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-left-down"
                                data-direction="left-down"
                            ></div>
                            <div
                                class="nts-dashboard-panel-resize-bar resize-left-up"
                                data-direction="left-up"
                            ></div>
                        </div>
                    </template>
                </div>
            </div>
        </transition-group>

        <el-dialog
            :visible.sync="addingPanel"
            :lock-scroll="false"
            :width="''"
            class="nts-compass-dialog"
        >
            <nts-compass @cardDblClick="cardDblClick" :cardList="panelOptions">
                <template v-slot:content="slotProps">
                    <slot
                        name="optionContent"
                        v-bind:option="panelOptions[slotProps.index]"
                        v-bind:index="slotProps.index"
                    >
                        {{ panelOptions[slotProps.index].content }}
                    </slot>
                </template>
            </nts-compass>
        </el-dialog>
    </div>
</template>

<script>
class DashboardPanel {
    constructor(options) {
        var options = arguments.length == 0 ? {} : arguments[0];
        var defaultOptions = {
            x: 0,
            y: 0,
            lengthRow: 1,
            lengthCol: 1,
            status: 0,
            panelType: -1, // 对应哪一个option
            sizeOffsetX: 0,
            sizeOffsetY: 0,
            configable: true, //是否可设置
            popout: true, // can be popped out or not
            hidding: false,
            key: Math.random() + "-" + new Date().getTime(),
            vuePointer: null,
        };
        DashboardPanel.panelCounter++;
        var constOptions = {
            resizeable: true,
            transform: new Matrix(),
            dragging: false,
            resizing: false,
            resizeDirection: "right-down", // left right up down
        };
        this.defaultOptions = JSON.parse(JSON.stringify(defaultOptions));
        Object.assign(defaultOptions, options, constOptions);
        Object.assign(this, defaultOptions);
    }
}
DashboardPanel.prototype.addToDashboard = function () {
    if (this.vuePointer === null) {
        return false;
    }
    var _vue = this.vuePointer;
    _vue.setPanel(this.x, this.y, this.lengthRow, this.lengthCol, {
        panelOptions: this,
    });
};
DashboardPanel.panelCounter = 0;
export default {
    props: {
        options: {
            type: Object,
            default: function () {
                return {};
            },
        },
        panels: {
            type: Array,
            default: function () {
                return [];
            },
        },
        panelOptions: {
            default: function () {
                return [];
            },
        },
    },
    data(data) {
        var defaultOptions = {
            type: 0,
            dimensionX: 4,
            dimensionY: 5,
            unitWidth: 250,
            unitHeight: 220,
            addingPanel: false,
            closeAnimation: false,
        };
        defaultOptions = Object.assign(defaultOptions, data.options);
        return Object.assign(defaultOptions, {
            defaultOptions: JSON.parse(JSON.stringify(defaultOptions)),
        });
    },
    computed: {
        computedPanels: function () {
            var computedPanels = {},
                panels = this.panels;
            for (var i = 0; i < this.panels.length; i++) {
                var panel = this.panels[i];
                if (!(panel instanceof DashboardPanel)) {
                    this.panels[i] = new DashboardPanel(
                        Object.assign(panel, {
                            status: 1,
                        })
                    );
                    panel = this.panels[i];
                }
                panel.index = i;
                panel.vuePointer = this;
                computedPanels[this.getPanelKey(panel.x, panel.y)] = panel;
            }
            return computedPanels;
        },
        computedPanelStyles: function () {
            var panels = this.panels,
                styles = [];
            for (var i = 0; i < panels.length; i++) {
                var panel = panels[i];
                var style = [
                    "width:" + this.unitWidth * panel.lengthCol + "px",
                    "height:" + this.unitHeight * panel.lengthRow + "px",
                    `left:${this.unitWidth * panel.y}px`,
                    `top:${this.unitHeight * panel.x}px`,
                    `z-index:${panel.dragging || panel.resizing ? "999" : "0"}`,
                    `transform:${panel.transform.toString()}`,
                ];
                styles.push(style.join(";"));
            }
            return styles;
        },
        resizeMaskStyles: function () {
            var styles = [],
                panels = this.panels,
                matrix = this.matrix,
                positionStyles = {
                    left: "right:0px;left:unset;top:0px;bottom:unset",
                    right: "left:0px;left:0px;top:0px;bottom:unset",
                    up: "right:unset;left:0px;top:unset;bottom:0px",
                    down: "right:unset;left:0px;top:0px;bottom:unset",
                    "left-up": "right:0px;left:unset;bottom:0px;top:unset",
                    "left-down": "right:0px;left:unset;top:0px;bottom:unset",
                    "right-up": "right:unset;left:0px;top:unset;bottom:0px",
                    "right-down": "right:unset;left:0px;top:0px;bottom:unset",
                };
            for (var i = 0; i < this.panels.length; i++) {
                var panel = this.panels[i],
                    direction = panel.resizeDirection
                        ? panel.resizeDirection
                        : "left",
                    positionStyle = positionStyles[direction];
                var style = [
                    `width:calc(100% + ${panel.sizeOffsetX}px)`,
                    `height:calc(100% + ${panel.sizeOffsetY}px)`,
                ];
                style = style.concat(positionStyle).join(";");
                styles.push(style);
            }
            return styles;
        },
        //contains panels (status = 1 status = 2)
        panelStyles: function () {
            var styles = [];
            for (var i = 0; i < this.dimensionX; i++) {
                styles[i] = [];
                for (var j = 0; j < this.dimensionY; j++) {
                    var panel = this.matrix[i][j],
                        direction = panel.resizeDirection;
                    var style = [
                        "width:" + this.unitWidth * panel.lengthCol + "px",
                        "height:" + this.unitHeight * panel.lengthRow + "px",
                        `left:${this.unitWidth * j}px`,
                        `top:${this.unitHeight * i}px`,
                        `z-index:${
                            panel.dragging || panel.resizing ? "999" : "0"
                        }`,
                    ];
                    styles[i][j] = style.join(";");
                }
            }
            return styles;
        },
        dashboardStyle: function () {
            var style = [
                "width:" + this.unitWidth * this.dimensionY + "px",
                "height:" + this.unitHeight * this.dimensionX + "px",
            ];
            return style.join(";");
        },
        matrix: function () {
            var arr = [[]];
            var computedPanels = this.computedPanels,
                insertedPanels = [];
            for (var i = 0; i < this.dimensionX; i++) {
                arr[i] = [];
                for (var j = 0; j < this.dimensionY; j++) {
                    var panelKey = this.getPanelKey(i, j);
                    var usedPanel = computedPanels[panelKey];
                    arr[i][j] = new DashboardPanel({
                        x: i,
                        y: j,
                        key: panelKey,
                    });
                    if (
                        usedPanel &&
                        usedPanel.x + usedPanel.lengthRow <= this.dimensionX &&
                        usedPanel.y + usedPanel.lengthCol <= this.dimensionY
                    ) {
                        insertedPanels.push(usedPanel);
                    }
                }
            }
            // set status = 2
            for (var i in insertedPanels) {
                var panel = insertedPanels[i];
                for (var m = 0; m < panel.lengthRow; m++) {
                    for (var n = 0; n < panel.lengthCol; n++) {
                        arr[m + panel.x][n + panel.y].status =
                            m == 0 && n == 0 ? 1 : 2;
                    }
                }
            }
            return arr;
        },
    },
    mounted() {
        var _this = this,
            timeFunc;
        window.addEventListener("resize", function () {
            clearTimeout(timeFunc);
            timeFunc = setTimeout(_this.resizeDashboard);
        });
        this.$nextTick(function () {
            _this.listenGrab();
            _this.listenResize();
        });
        this.resizeDashboard();
    },
    watch: {
        panels: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.listenGrab();
                _this.listenResize();
            });
        },
    },
    methods: {
        listenResize: function () {
            var $el = $(this.$el),
                _this = this,
                multis = {
                    left: {
                        x: -1,
                        y: 0,
                    },
                    right: {
                        x: 1,
                        y: 0,
                    },
                    up: {
                        y: -1,
                        x: 0,
                    },
                    down: {
                        y: 1,
                        x: 0,
                    },
                    "left-up": {
                        x: -1,
                        y: -1,
                    },
                    "left-down": {
                        y: 1,
                        x: -1,
                    },
                    "right-up": {
                        x: 1,
                        y: -1,
                    },
                    "right-down": {
                        x: 1,
                        y: 1,
                    },
                };
            $el.find(".nts-dashboard-panel-resize-mask").each(function () {
                if (this.resizeListening) {
                    return;
                }
                var index = parseInt($(this).data("index")),
                    panel = _this.panels[index];
                $(this)
                    .find(".nts-dashboard-panel-resize-bar")
                    .each(function () {
                        var direction = $(this).data("direction");
                        var multi = Object.assign(
                            {
                                x: 1,
                                y: 1,
                            },
                            multis[direction]
                        );
                        $(this).myDrag({
                            moveTarget: $("body"),
                            start: function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                panel.resizing = true;
                            },
                            move: function (e) {
                                e.preventDefault();
                                var offsetX = multi.x * e.myDragX,
                                    offsetY = multi.y * e.myDragY;
                                panel.resizeDirection = direction;
                                var unitWidth =
                                        $el.outerWidth() / _this.dimensionY,
                                    unitHeight =
                                        $el.outerHeight() / _this.dimensionX;
                                panel.sizeOffsetX = Math.max(
                                    panel.sizeOffsetX + offsetX,
                                    10 - unitWidth * panel.lengthCol
                                );
                                panel.sizeOffsetY = Math.max(
                                    panel.sizeOffsetY + offsetY,
                                    10 - unitHeight * panel.lengthRow
                                );
                                _this.$set(_this.panels, index, panel);
                            },
                            end: function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                var unitWidth =
                                        $el.outerWidth() / _this.dimensionY,
                                    unitHeight =
                                        $el.outerHeight() / _this.dimensionX;
                                var offsetIndexY = Math.round(
                                        panel.sizeOffsetX / unitWidth
                                    ),
                                    offsetIndexX = Math.round(
                                        panel.sizeOffsetY / unitHeight
                                    ),
                                    lengthRow = Math.max(
                                        1,
                                        offsetIndexX + panel.lengthRow
                                    ),
                                    lengthCol = Math.max(
                                        1,
                                        offsetIndexY + panel.lengthCol
                                    );
                                var tryMove = false,
                                    tryResize = false,
                                    targetX = panel.x,
                                    targetY = panel.y,
                                    oldlengthRow = panel.lengthRow,
                                    oldlengthCol = panel.lengthCol;

                                if (multi.x < 0) {
                                    targetY = Math.min(
                                        panel.y + panel.lengthCol - 1,
                                        panel.y + multi.x * offsetIndexY
                                    );
                                }
                                if (multi.y < 0) {
                                    targetX = Math.min(
                                        panel.x + panel.lengthRow - 1,
                                        panel.x + multi.y * offsetIndexX
                                    );
                                }
                                if (
                                    oldlengthRow * oldlengthCol >
                                    lengthCol * lengthRow
                                ) {
                                    if (
                                        _this.resizePanel(
                                            panel,
                                            lengthRow,
                                            lengthCol
                                        )
                                    ) {
                                        _this.movePanel(
                                            panel,
                                            targetX,
                                            targetY
                                        );
                                    }
                                } else {
                                    if (
                                        _this.movePanel(panel, targetX, targetY)
                                    ) {
                                        _this.resizePanel(
                                            panel,
                                            lengthRow,
                                            lengthCol
                                        );
                                    }
                                }
                                panel.resizing = false;
                                panel.sizeOffsetX = 0;
                                panel.sizeOffsetY = 0;
                            },
                        });
                    });
                this.resizeListening = true;
            });
        },
        listenGrab: function () {
            var $el = $(this.$el),
                _this = this;
            //move panel position
            $el.find("[grab-icon='true']").each(function (index) {
                if (this.dragListening) {
                    return;
                }
                var $icon = $(this),
                    index = parseInt($icon.data("index")),
                    panelObj = _this.panels[index];
                $icon.myDrag({
                    moveTarget: $el,
                    start: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        panelObj.dragging = true;
                    },
                    move: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var offsetX = e.myDragX,
                            offfsetY = e.myDragY;
                        panelObj.transform = panelObj.transform.multi(
                            new Matrix(1, 0, 0, 1, offsetX, offfsetY)
                        );
                        _this.$set(_this.panels, index, panelObj);
                    },
                    end: function (e) {
                        var matrix = panelObj.transform;
                        var sumWidth = $el.outerWidth(),
                            sumHeight = $el.outerHeight();
                        var unitWidth = sumWidth / _this.dimensionY,
                            unitHeight = sumHeight / _this.dimensionX;
                        var targetY =
                                Math.round(matrix.e / unitWidth) + panelObj.y, //横移多少个单位
                            targetX =
                                Math.round(matrix.f / unitHeight) + panelObj.x; //纵移多少个单位
                        _this.movePanel(panelObj, targetX, targetY);

                        panelObj.transform = new Matrix();
                        panelObj.dragging = false;
                    },
                });
                this.dragListening = true;
            });
            //resize panel
        },
        resizePanel: function (panelObj, lengthRow, lengthCol) {
            panelObj.status = 0;
            var oldPanelSet = this.getPanelSet(
                panelObj.x,
                panelObj.y,
                panelObj.lengthRow,
                panelObj.lengthCol
            );
            oldPanelSet.map(function (v) {
                v.status = 0;
            });
            var tryMove = this.setPanel(
                panelObj.x,
                panelObj.y,
                lengthRow,
                lengthCol,
                {
                    setStatus: false,
                    strictMatch: true,
                }
            );
            oldPanelSet.map(function (v, index) {
                v.status = index == 0 ? 1 : 2;
            });
            panelObj.status = 1;
            if (tryMove.errorCode != 0) {
                return false;
            }

            if (typeof panelObj.beforeResize === "function") {
                var resizable = panelObj.beforeResize(
                    panelObj,
                    lengthRow,
                    lengthCol
                );
                if (resizable === false) {
                    return false;
                }
            }

            panelObj.lengthRow = lengthRow;
            panelObj.lengthCol = lengthCol;
            this.$emit("panelResize", panelObj);
            return true;
        },
        movePanel: function (panelObj, targetX, targetY) {
            var _this = this,
                originalX = panelObj.x,
                originalY = panelObj.y;
            var originalKey = this.getPanelKey(originalX, originalY),
                targetKey = this.getPanelKey(targetX, targetY),
                originalPanel = this.computedPanels[originalKey],
                originalPanelSet = this.getPanelSet(
                    originalX,
                    originalY,
                    panelObj.lengthRow,
                    panelObj.lengthCol
                );
            originalPanelSet.map(function (v) {
                v.status = 0;
            });
            var tryMove = _this.setPanel(
                targetX,
                targetY,
                panelObj.lengthRow,
                panelObj.lengthCol,
                {
                    setStatus: false,
                    strictMatch: true,
                    panelType: panelObj.panelType,
                }
            );
            originalPanelSet.map(function (v, index) {
                v.status = index == 0 ? 1 : 2;
            });
            if (tryMove.errorCode != 0) {
                _this.$message({
                    type: "error",
                    message: tryMove.errorMessage,
                });
                return false;
            } else {
                originalPanel.x = targetX;
                originalPanel.y = targetY;
                return true;
            }
        },
        cardDblClick: function (data) {
            var targetPanel = this.targetPanel;
            if (!targetPanel) {
                return;
            }
            var card = data.card;
            var result = this.setPanel(
                targetPanel.x,
                targetPanel.y,
                card.size.x,
                card.size.y,
                {
                    panelType: data.index,
                    panelOptions: card,
                }
            );
            this.addingPanel = false;
            if (result.errorCode != 0) {
                this.$message({
                    message: result.errorMessage,
                    type: "error",
                    duration: 2000,
                });
            }
        },
        panelClick: function (panel, event) {
            switch (panel.status) {
                case 0:
                    this.addingPanel = true;
                    this.targetPanel = panel;
                    break;
            }
        },
        releaseAllPanels: function () {
            this.panels = [];
        },
        //释放一个panel
        releasePanel: function (startX, startY) {
            var panelKey = this.getPanelKey(startX, startY);
            var usedPanel = this.computedPanels[panelKey];
            if (!usedPanel || usedPanel.status != 1) {
                return {
                    errorCode: 1,
                    errorMessage: "target panel not used or not exist",
                };
            }
            this.deletePanel(startX, startY);
            return {
                errorCode: 0,
                errorMessage: "panel released",
            };
        },
        deletePanel: function (x, y) {
            var key = this.getPanelKey(x, y),
                panel = this.computedPanels[key];
            this.panels.splice(this.panels.indexOf(panel), 1);
        },
        //选择一个panel
        setPanel: function (
            startX,
            startY,
            lengthRow,
            lengthCol,
            options = {}
        ) {
            var defaultOptions = {
                setStatus: true,
                strictMatch: false,
                panelType: -1,
                panelOptions: {},
            };
            options = $.extend(defaultOptions, options);
            var _this = this;
            var matrix = this.matrix;
            var panel = matrix[startX] ? matrix[startX][startY] : undefined;
            if (!panel) {
                return {
                    errorCode: 1,
                    errorMessage: "panel not found",
                };
            }
            var panelSet = [],
                panelFinded = false,
                offsetX = startX,
                offsetY = startY;
            outerLoop: while (
                offsetX >= 0 &&
                !panelFinded &&
                offsetX + lengthRow > startX
            ) {
                offsetY = startY;
                while (
                    offsetY >= 0 &&
                    !panelFinded &&
                    offsetY + lengthCol > startY
                ) {
                    panelSet = this.getPanelSet(
                        offsetX,
                        offsetY,
                        lengthRow,
                        lengthCol,
                        0
                    );
                    if (panelSet.length == lengthRow * lengthCol) {
                        panelFinded = true;
                    }
                    offsetY--;
                    if (options.strictMatch) {
                        break outerLoop;
                    }
                }
                offsetX--;
            }
            if (!panelFinded) {
                return {
                    errorCode: 2,
                    errorMessage: "panels not enough",
                };
            }
            //设置状态
            if (options.setStatus) {
                if (options.panelOptions instanceof DashboardPanel) {
                    this.panels.push(options.panelOptions);
                } else {
                    _this.panels.push(
                        Object.assign(
                            {
                                status: 1,
                                lengthCol: lengthCol,
                                lengthRow: lengthRow,
                                panelType: options.panelType,
                                x: panelSet[0].x,
                                y: panelSet[0].y,
                            },
                            options.panelOptions
                        )
                    );
                }
            }
            return {
                errorCode: 0,
                errorMessage: "success",
                panelSet: panelSet,
            };
        },
        getPanelSet: function (
            startX,
            startY,
            lengthRow,
            lengthCol,
            status = undefined
        ) {
            var limitX = this.dimensionX,
                limitY = this.dimensionY;
            var _this = this;
            var matrix = this.matrix;
            //取出所有start - end 范围内的panel
            var panelSet = [];
            for (var i = 0; i < lengthRow; i++) {
                var indexX = startX + i;
                if (indexX >= limitX) {
                    break;
                }
                panelSet = panelSet.concat(
                    matrix[indexX].slice(startY, startY + lengthCol)
                );
            }
            if (status != undefined) {
                panelSet = panelSet.filter(function (v) {
                    return v.status === status;
                });
            }
            return panelSet;
        },
        getPanelVueKey: function (panel) {
            if (panel.key != undefined) {
                return panel.key;
            }
            var x = panel.x,
                y = panel.y,
                status = panel.status,
                direction = panel.resizeDirection;
            // if (direction.indexOf('left') >= 0) {
            //     y = y + panel.lengthCol - 1;
            // }
            // if (direction.indexOf('up') >= 0) {
            //     x = x + panel.lengthRow - 1;
            // }
            return x + "-" + y;
        },
        getPanelKey: function (x, y) {
            return x + "-" + y;
        },
        resizeDashboard: function () {
            // var $parent = $(window);
            // var width = $parent.outerWidth(),
            //     height = $parent.outerHeight();
            // this.dimensionY = this.defaultOptions.dimensionY;
            // this.dimensionX = this.defaultOptions.dimensionX;
            // this.unitWidth = this.defaultOptions.unitWidth;
            // this.unitHeight = this.defaultOptions.unitHeight;
            // if (width >= 1500) {
            //     this.dimensionY = 5;
            // } else if (width >= 769) {
            //     this.dimensionY = Math.floor(width / this.unitWidth);
            // } else {
            //     this.dimensionY = 1;
            //     this.dimensionX = 10;
            //     this.unitWidth = 200;
            // }
        },
    },
};
</script>

<style lang="scss">
@import "./dashboard.scss";
</style>
