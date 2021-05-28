<template>
    <div class="price-number-container">
        <div class="price-number">
            <span
                v-for="(priceNumber, index) in numbers"
                :key="index"
                :class="{ 'big-number': priceNumber.size == 'big' }"
            >
                {{ priceNumber.number }}
            </span>
        </div>
    </div>
</template>
<script>
const $ = require("jquery"),
    { Matrix } = require("@/assets/js/Matrix.js");
const PriceNumber = function (options = {}) {
    if (typeof options != "object") {
        options = {
            number: options,
        };
    }
    var defaultOptions = {
        number: "",
        size: "normal", // normal big small
    };
    options = Object.assign(defaultOptions, options);
    Object.assign(this, options);
};
PriceNumber.prototype.toString = function () {
    return this.number;
};

export default {
    data() {
        return {};
    },
    props: {
        numberList: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    computed: {
        numbers: function () {
            var numberList = this.numberList,
                numbers = [];
            for (var i = 0; i < numberList.length; i++) {
                numbers.push(new PriceNumber(numberList[i]));
            }
            return numbers;
        },
    },
    mounted() {
        this.resizeNumber();
        var _this = this;
        $(window).on("resize", function () {
            clearTimeout(_this.timeFunc);
            _this.timeFunc = setTimeout(_this.resizeNumber);
        });
    },
    methods: {
        resizeNumber: function (delay = 0) {
            var $container = $(this.$el),
                $number = $(this.$el.querySelector(".price-number"));
            if (!$container.is(":visible")) {
                return;
            }
            setTimeout(function () {
                var scaleX = $container.innerWidth() / $number.outerWidth(),
                    scaleY = $container.innerHeight() / $number.outerHeight(),
                    scale = Math.min(1, scaleX, scaleY);
                $($number).css(
                    "transform",
                    new Matrix(scale, 0, 0, scale, 0, 0).toString()
                );
            }, delay);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./priceNumber.scss";
</style>