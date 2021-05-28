<template>
    <div style="width: 100%">
        <!--popout windows list -->
        <ul class="popout-windows-list" v-show="popoutWindows.length > 0">
            <span class="font-bold"> Popout Windows:&nbsp;&nbsp; </span>
            <li
                v-for="popoutWindow in popoutWindows"
                :key="popoutWindow.panel.key"
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="popoutWindow.panel.title"
                    placement="top"
                >
                    <div
                        @click="popoutWindow.popoutWindow.window.focus()"
                        class="list-btn nts-to-top"
                    >
                        <a-icon
                            @click.stop="
                                popoutWindow.popoutWindow.window.close()
                            "
                            class="badge"
                            theme="filled"
                            type="close-circle"
                        />
                        <thumbnail
                            class="btn-shadowed"
                            :componentId="popoutWindow.panel.thumbnail.name"
                        ></thumbnail>
                    </div>
                </el-tooltip>
            </li>
        </ul>
        <el-tabs
            v-model="editableTabsValue"
            type="border-card"
            class="main-container-tabs"
            @tab-remove="removeTab"
            @tab-click="handleTabClick"
        >
            <el-tab-pane
                :closable="true"
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
                <nts-dashboard
                    :key="`dashboard-${index}`"
                    :panels="item.panels"
                    :panelOptions="panelOptions"
                    @panelResize="panelResize"
                >
                    <!-- panel title -->
                    <template v-slot:panelTitle="slotProps">
                        {{ slotProps.panel.title }}
                    </template>
                    <!-- panel editor -->
                    <template v-slot:panelEditor="slotProps">
                        <i
                            @click="popoutPanel(slotProps.panel)"
                            v-if="slotProps.panel.popout"
                            class="el-icon-copy-document el-icon cursor-pointer margin-horizon"
                        ></i>
                        <i
                            @click="configWidget(slotProps.panel)"
                            v-if="slotProps.panel.configable"
                            class="el-icon el-icon-setting cursor-pointer margin-horizon"
                        ></i>
                    </template>
                    <!-- widget component -->
                    <template v-slot:panelBody="slotProps">
                        <widget
                            :ref="'widget-' + slotProps.panel.key"
                            :componentId="slotProps.panel.name"
                        ></widget>
                    </template>
                    <!-- widget thumbnail -->
                    <template v-slot:optionContent="slotProps">
                        <div class="widget-thumbnail">
                            <thumbnail
                                v-if="slotProps.option.thumbnail != undefined"
                                :componentId="slotProps.option.thumbnail.name"
                            ></thumbnail>
                        </div>
                    </template>
                </nts-dashboard>
            </el-tab-pane>
            <el-tab-pane :closable="false" key="add" label="add" name="add">
                <span slot="label">
                    <i class="el-icon-circle-plus"></i>
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editableTabsValue: "1",
            editableTabs: [
                {
                    title: "Tab 1",
                    name: "1",
                    panels: [],
                },
                {
                    title: "Tab 2",
                    name: "2",
                    panels: [],
                },
            ],
            popoutWindows: [],
            messageListener: null,
        };
    },

    methods: {
        popoutPanel: function (panel) {
            window.popoutWindows = this.popoutWindows;
            var key = panel.key,
                url = "/popout/" + key,
                origin = window.origin,
                _this = this;
            var windowObj = new this.PopoutWindow({
                url: url,
                name: "_blank",
                onLoad: function () {
                    setTimeout(function () {
                        windowObj.window.postMessage(
                            "handshake message",
                            origin
                        );
                        _this.syncThemeWithPopoutWindows();
                    });
                },
                onClose: function () {
                    for (var i = 0; i < _this.popoutWindows.length; i++) {
                        if (_this.popoutWindows[i].panel === panel) {
                            _this.popoutWindows.splice(i, 1);
                            break;
                        }
                    }
                    panel.addToDashboard();
                },
            });
            if (windowObj.window === null) {
                console.error("can not pop up a window");
                return;
            }
            this.popoutWindows.push({
                popoutWindow: windowObj,
                key: key,
                panel: panel,
            });
            this.editableTabs[this.tabIndex].panels.splice(panel.index, 1);
        },
        messageHandler: function (msg) {
            var data = msg.data;
            switch (data.action) {
                case "getComponentId":
                    var targets = this.popoutWindows.filter(function (v) {
                        return v.key === data.key;
                    });
                    if (targets.length === 0) {
                        return;
                    }
                    var target = targets[0];
                    target.popoutWindow.window.postMessage({
                        action: "sync",
                        syncData: {
                            componentId: target.panel.name,
                        },
                    });
                    break;
            }
        },
        addMessageListener() {
            var _this = this;
            this.messageListener = new this.MessageListener({
                handler: _this.messageHandler,
            });
        },
        syncThemeWithPopoutWindows: function () {
            var popoutWindows = this.popoutWindows,
                themeIndex = this.themeIndex;
            for (var i = 0; i < popoutWindows.length; i++) {
                var popoutWindow = popoutWindows[i].popoutWindow;
                popoutWindow.window.postMessage(
                    { action: "syncTheme", themeIndex: themeIndex },
                    window.origin
                );
            }
        },
        panelResize: function (panel) {
            var widget = this.$refs["widget-" + panel.key][0];
            if (typeof widget.onResize === "function") {
                widget.onResize();
            }
        },
        configWidget: function (panel) {
            var widget = this.$refs["widget-" + panel.key][0];
            if (typeof widget.configWidget === "function") {
                widget.configWidget();
            }
        },
        handleTabClick: function (tab, event) {
            if (tab.name === "add") {
                this.addTab();
            }
        },
        addTab(targetName) {
            let newTabName = Math.random() + "-" + Date.now();
            this.editableTabs.push({
                title: "New Tab",
                name: newTabName,
                content: "New Tab content",
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }

            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
        },
        beforeResize: function (panelObj, targetX, targetY) {
            var defaultConf = {
                maxX: null,
                maxY: null,
                minX: 1,
                minY: 1,
            };
            var sizeConf = Object.assign(defaultConf, panelObj.size);
            var result =
                (sizeConf.maxX === null || sizeConf.maxX >= targetX) &&
                (sizeConf.minX === null || sizeConf.minX <= targetX) &&
                (sizeConf.maxY === null || sizeConf.maxY >= targetY) &&
                (sizeConf.minY === null || sizeConf.minY <= targetY);
            if (!result) {
                this.$message({
                    type: "error",
                    message: `The limit of columns and rows the widget occupies is : row:${
                        sizeConf.minX
                    } - ${sizeConf.maxX ? sizeConf.maxX : "∞"} 
                    column:${sizeConf.minY} - ${
                        sizeConf.maxY ? sizeConf.maxY : "∞"
                    }`,
                });
            }
            return result;
        },
    },

    computed: {
        tabIndex: function () {
            return parseInt(this.editableTabsValue) - 1;
        },
        panelOptions: function () {
            var options = [],
                widgets = this.$store.state.widgets;
            for (var i = 0; i < widgets.length; i++) {
                var panelObj = Object.assign({}, widgets[i], {
                    beforeResize: this.beforeResize,
                });
                options.push(panelObj);
            }
            return options;
        },
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
    },
    mounted() {
        this.addMessageListener();
    },
    destroyed() {
        if (this.messageListener.destroy) {
            this.messageListener.destroy();
        }
    },
    watch: {
        themeIndex: function (v) {
            this.syncThemeWithPopoutWindows();
        },
    },
};
</script>

<style lang="scss">
@import "./main.scss";
</style>
