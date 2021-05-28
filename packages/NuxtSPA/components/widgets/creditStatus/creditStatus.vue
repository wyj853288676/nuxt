<template>
    <div class="widget-credit-status">
        <el-table @row-click="rowClick" :data="mockData" style="width: auto">
            <el-table-column prop="status" label="" width="50">
                <nts-light
                    slot-scope="scope"
                    :active="scope.row.active"
                    :fill="scope.row.fill"
                ></nts-light>
            </el-table-column>
            <el-table-column prop="creditLine" label="Credit Line" width="200">
            </el-table-column>
            <el-table-column prop="percent" label="%" width="50">
            </el-table-column>
            <el-table-column prop="type" label="Type"> </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="viewing"
            :lock-scroll="false"
            :width="'750px'"
            :append-to-body="true"
        >
            <template v-slot:title>
                <div>
                   Account Summary: {{viewingRow.creditLine}}
                </div>
            </template>
            <div slot='footer'>
                <el-button class='btn-form-control text-sm btn-shadowed light-hover' type="primary" @click="closeViewing" >Close</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const mockData = [
    {
        active: true,
        fill: "#67C23A",
        creditLine: "CFETS CLIENT 1",
        percent: "0%",
        type: "GNLS",
    },
    {
        active: true,
        fill: "#F56C6C",
        creditLine: "CFETS CLIENT 1",
        percent: "0%",
        type: "GNLS_DELTA",
    },
    {
        active: true,
        fill: "#E6A23C",
        creditLine: "CFETS CLIENT 1",
        percent: "0%",
        type: "GNLS_SD",
    },
    {
        active: true,
        fill: "#909399",
        creditLine: "CFETS CLIENT 1",
        percent: "0%",
        type: "DTO",
    },
    {
        active: false,
        fill: "",
        creditLine: "CFETS CLIENT 1",
        percent: "0%",
    },
];
export default {
    data() {
        return {
            viewingRow: {},
            viewing: false,
            mockData: mockData,
        };
    },
    methods: {
        rowClick: function (row, column, event) {
            this.viewing = true;
            this.viewingRow = row;
        },
        closeViewing: function(){
            this.viewingRow = {};
            this.viewing = false;
        }
    },
};
</script>

<style lang="scss" >
.widget-credit-status .el-table th,
.widget-credit-status .el-table tr {
    background-color: transparent;
}
.widget-credit-status .el-table tr td {
    cursor: pointer !important;
}
</style>