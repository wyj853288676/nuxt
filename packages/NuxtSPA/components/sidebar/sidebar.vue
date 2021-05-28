<template>
    <aside>
        <ul class="nts-sidebar-ul">
            <li
                v-for="(li, index) in list"
                :key="index"
                class="nts-sidebar-li"
                :class="liClasses[index]"
                :style="liStyles[index]"
                @click="liClick(index)"
            >
                <el-button>
                    <i :class="li.icon" class="nts-sidebar-icon"></i>
                </el-button>
            </li>
        </ul>
        <div
            class="nts-sidebar-content"
            :active="activeIndex >= 0"
            :style="contentStyle"
        >
            <slot v-if='activeIndex > -1' name="sidebarContent" v-bind:activeLi="list[activeIndex]">
            </slot>
        </div>
    </aside>
</template>

<script>
const mockSidebarData = [
    {
        title: "page config",
        icon: "el-icon-setting",
    },
];
const uiConfig = {
    liWidth: "3em",
    contentWidth: "250px",
};
export default {
    props: {
        list: {
            type: Array,
            default: function () {
                return mockSidebarData;
            },
        },
        config: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    data: function () {
        return {
            uiConfig: JSON.parse(JSON.stringify(uiConfig)),
            activeIndex: -1,
        };
    },
    computed: {
        contentStyle: function () {
            var style = [`width:${this.computedConfig.contentWidth}`];
            return style.join(";");
        },
        liStyles: function () {
            var styles = [];
            for (var i = 0; i < this.list.length; i++) {
                var style = [
                    `width:${this.computedConfig.liWidth}`,
                    `height:${this.computedConfig.liWidth}`,
                ];
                styles.push(style.join(";"));
            }
            return styles;
        },
        liClasses: function () {
            var classes = [],
                activeIndex = this.activeIndex;
            for (var i = 0; i < this.list.length; i++) {
                var classObj = {};
                if (activeIndex == i) {
                    classObj.active = true;
                }
                classes.push(classObj);
            }
            return classes;
        },
        computedConfig: function () {
            return Object.assign(this.uiConfig, this.config);
        },
    },
    methods: {
        liClick: function (index) {
            if (this.activeIndex == index) {
                this.activeIndex = -1;
            } else {
                this.activeIndex = index;
            }
        },
    },
};
</script>


<style lang="scss" scoped>
@import "./sidebar.scss";
</style>