<template>
    <div style="width: 100%; padding: 10px">
        <el-tabs v-model="editableTabsValue" type="border-card" class="main-container-tabs" @tab-remove="removeTab" @tab-click="handleTabClick">
            <el-tab-pane :closable="true" v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                <nwt-dashboard :panels="item.panels">
                    <i class="el-icon-plus" style="font-size: 3em"></i>
                </nwt-dashboard>
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
    },

    computed: {
        tabIndex: function () {
            return parseInt(this.editableTabsValue) - 1;
        },
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
    },
    mounted() {
        //build the socket to subscribe market data
        this.$store.commit("market/buildSocket");
    },
    destroyed() { },
    watch: {},
};
</script>

<style lang="scss">
@import "./main.scss";
</style>
