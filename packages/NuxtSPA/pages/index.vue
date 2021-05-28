<template>
    <el-container>
        <el-header height='45px'> 
            <nts-header></nts-header>
        </el-header>
        <el-container class="flex-container">
            <nts-main-container> </nts-main-container>
        </el-container>
        <nts-sidebar :list="sidebarList">
            <template v-slot:sidebarContent="slotProps">
                <slot name="sidebarContent">
                    <component :is="slotProps.activeLi.component"></component>
                </slot>
            </template>
        </nts-sidebar>
    </el-container>
</template>

<script>
const mockDatas = {
    sidebarList: [
        {
            title: "page config",
            icon: "el-icon-setting",
            component: "ui-config",
        },
    ],
};
export default {
    asyncData({
        isDev,
        route,
        store,
        env,
        params,
        query,
        req,
        res,
        redirect,
        error,
    }) {
        return {};
    },
    props: {
        sidebarList: {
            type: Array,
            default: function () {
                return mockDatas.sidebarList;
            },
        },
    },
    data() {
        return {};
    },
    methods: {},
    computed: {
    },
    mounted() {
        var defaultThemeIndex = this.$store.state.defaultThemeIndex;
        this.$store.commit("changeTheme", defaultThemeIndex)
    },
};
</script>
