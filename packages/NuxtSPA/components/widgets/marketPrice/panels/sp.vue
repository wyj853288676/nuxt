<template>
    <el-container class="market-price-content nts-fade-in flex-wrap">
        <el-row class="buy-sell-card-container text-sm">
            <el-col :span="12" class="buy-card bs-card">
                <el-row>
                    <el-col class="card-title bg-buy" :span="18"> BUY </el-col>
                </el-row>
                <div class="buy-card-content card-content bg-buy">
                    <price-number
                        ref="priceNumber-buy"
                        :numberList="price"
                    ></price-number>
                </div>
            </el-col>
            <el-col :span="12" class="sell-card bs-card">
                <el-row>
                    <el-col class="card-title bg-sell" :span="18">
                        SELL
                    </el-col>
                </el-row>
                <div class="sell-card-content card-content bg-sell">
                    <price-number
                        ref="priceNumber-sell"
                        :numberList="price"
                    ></price-number>
                </div>
            </el-col>
            <div class="card-header-info">CCY PAIR</div>
        </el-row>

        <el-table
            :data="marketDatas"
            :show-header="false"
            stripe
            style="width: 100%"
            class="market-price-table"
        >
            <el-table-column label="operation"> </el-table-column>
            <el-table-column label="value" prop="value"> </el-table-column>
            <el-table-column label="operation"> </el-table-column>
        </el-table>
    </el-container>
</template>

<script>
const mockDatas = require("../mockDatas");
export default {
    props: {
        form: {
            type: Object,
            default: function () {
                return {};
            },
        },
        data: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    data: function () {
        return mockDatas;
    },
    computed: {},
    methods: {},
};
</script>

<style>
</style>