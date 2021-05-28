<template>
    <el-container
        class="market-price-content nts-fade-in flex-wrap market-price-config-container"
    >
        <el-row>
            <el-col :span="5" class="cursor-default input-title">SWP</el-col>
            <el-col :span="19">
                <el-select
                    :popper-append-to-body="false"
                    v-model="form.tenor"
                    placeholder="Amount"
                >
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" class="cursor-default input-title">Near</el-col>
            <el-col :span="8">
                <el-select
                    :popper-append-to-body="false"
                    v-model="form.tenor"
                    placeholder="Term"
                >
                </el-select>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-date-picker
                    v-model="form.date"
                    type="datetime"
                    placeholder=""
                    :clearable="false"
                    :format="'yyyy-MM-dd'"
                >
                </el-date-picker>
            </el-col>
        </el-row>
        <br />
        <br />
        <br />
        <div style="margin-bottom: 10px" class="flex-container cursor-default">
            Request
        </div>
        <el-row  class="bg-buy-sell btn-form-control flex-container cursor-pointer btn-shadowed light-hover">
            TWO &nbsp;&nbsp;&nbsp; SIDES
        </el-row>
        <el-row>
            <el-col
                :span="11"
                class="bg-buy btn-form-control flex-container cursor-pointer btn-shadowed light-hover"
            >
                BUY-SELL
            </el-col>
            <el-col
                :offset='2'
                :span="11"
                class="bg-sell btn-form-control flex-container cursor-pointer btn-shadowed light-hover"
            >
                SELL-BUY
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
};
</script>

<style lang='scss'>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100% !important;
}
</style>