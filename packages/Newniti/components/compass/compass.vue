<template>
    <div class="nts-compass">
        <div class="nts-compass-card-container" :style="containerStyle">
            <div
                v-for="(card, index) in cards"
                :style="cardStyles[index]"
                @click="cardClick(index)"
                @dblclick="cardDblClick(index)"
                class="nts-compass-card"
                :key="'card-' + index"
            >
                <slot name="content" v-bind:card="card" v-bind:index="index">
                    {{ card.content }}
                </slot>
                <el-col :span="24" class="">
                    <div class="flex-container h3 no-select">
                        {{ card.title }}
                    </div>
                </el-col>
            </div>
        </div>
        <div class="nts-compass-card-footer flex-container">
            <el-button
                type="primary"
                class="btn-shadowed"
                circle
                @click="jumpTo('last')"
            >
                <i class="el-icon-arrow-left h3 font-bold"></i>
            </el-button>
            <el-button
                type="primary"
                class="btn-shadowed"
                circle
                @click="jumpTo('next')"
            >
                <i class="el-icon-arrow-right h3 font-bold"></i>
            </el-button>
        </div>
    </div>
</template>

<script>
class CompassCard {
    constructor(options) {
        var options = arguments.length == 0 ? {} : arguments[0];
        var defaultOptions = {
            title: "New Card ",
            content: "Empty Card",
        };
        Object.assign(defaultOptions, options);
        Object.assign(this, defaultOptions);
    }
}
export default {
    props: {
        cardList: {
            default: function () {
                return [];
            },
        },
    },
    data(v) {
        var data = {
            rotateAngle: 0,
            config: {
                radius: 600,
                transition: 300,
                cardHeight: 220,
                cardWidth: 280,
                scrollEventInternal: 100, //  one handler for a scroll event every scrollEventInternal ms
                clickEventInterval: 200, // one handler for a click event every clickEventInterval ms
            },
            state: {
                rotateDirection: null, // 1  clock wise -1 : counter clock wise
                scrollEventTriggerTime: 0,
                clickEventTriggerTime: 0,
            },
            minLimit: 6,
            animationRendering: false,
        };
        return data;
    },
    watch: {
        rotateAngle: function (newV, oldV) {
            if (newV > oldV) {
                this.state.rotateDirection = 1;
            } else {
                this.state.rotateDirection = -1;
            }
        },
    },
    mounted() {
        this.bindListen();
    },
    methods: {
        jumpTo: function (type = "next") {
            if (this.cards.length === 0) {
                return;
            }
            if (
                Date.now() - this.state.clickEventTriggerTime <
                this.config.clickEventInterval
            ) {
                return;
            }
            var rotateAngle = this.rotateAngle % 360,
                index = this.index,
                anglePerCard = 360 / this.cardsLength,
                indexAngle = index * anglePerCard;
            if (rotateAngle < 0) {
                indexAngle = indexAngle - 360;
            }
            if (type == "next" && rotateAngle - indexAngle >= -1) {
                index++;
            } else if (type == "last" && indexAngle - rotateAngle >= -1) {
                index--;
            }
            this.state.clickEventTriggerTime = Date.now();
            this.rotateTo(index);
        },
        cardClick: function (index) {
            this.$emit("cardClick", {
                index: index,
                card: this.cards[index],
            });
        },
        cardDblClick: function (index) {
            this.$emit("cardDblClick", {
                index: index,
                card: this.cards[index],
            });
        },
        bindListen: function () {
            var $el = $(this.$el),
                $body = $el,
                _this = this;
            var startTime, endTime, totalX;
            //scroll event handler
            $el.on("mousewheel DOMMousescroll", function (e) {
                e.stopPropagation();
                e.preventDefault();
                var delta = e.originalEvent.deltaY;
                if (
                    delta * _this.state.rotateDirection > 0 &&
                    Date.now() - _this.state.scrollEventTriggerTime <
                        _this.config.scrollEventInternal
                ) {
                    return;
                }

                var angle = (180 * _this.computedAngle) / Math.PI;
                if (delta < 0) {
                    angle = -angle;
                }
                _this.state.scrollEventTriggerTime = Date.now();
                _this.aniRotateBy(angle, 5);
            });
            //drag event handler; use jquery.prototype.myDrag (/static/js/plugins.js)
            $body.myDrag({
                start: function (e) {
                    $body.addClass("grabbing");
                    startTime = new Date().getTime();
                    totalX = 0;
                },
                end: function (e) {
                    endTime = new Date().getTime();
                    if (Math.abs(totalX / (endTime - startTime)) > 6) {
                        var addNum = totalX > 0 ? 50 : -50;
                        _this.aniRotateBy(
                            (totalX * 360) / Math.PI / 2 / _this.config.radius +
                                addNum
                        );
                    }
                    $body.removeClass("grabbing");
                },
                move: function (e) {
                    e.preventDefault();
                    totalX -= e.myDragX;
                    _this.rotateBy(
                        (-e.myDragX * 360) / Math.PI / 2 / _this.config.radius
                    );
                },
            });
        },
        startRotate: function () {
            let _this = this;
            this.stopRotate();
            this.animtionFunc = setInterval(function () {
                _this.rotateBy(_this.computedAngle * Math.PI);
            }, this.config.transition);
        },
        stopRotate: function () {
            cancelAnimationFrame(this.animationFunc);
            clearInterval(this.animtionFunc);
        },
        rotateBy: function (angle) {
            this.rotateAngle += angle;
        },
        rotate: function (angle) {
            this.rotateAngle = angle;
        },
        aniRotate: function (angle, ms) {
            var angleChanged = angle - this.rotateAngle;
            if (angleChanged == 0) {
                return false;
            }
            var ms = arguments.length > 1 ? arguments[1] : 5;
            var _this = this;
            var time = Math.ceil(Math.abs(angle - this.rotateAngle) * ms),
                timeUsed = 0;
            this.animationRendering = true;

            return new Promise(render);

            function render(resolve, reject) {
                var startTime = new Date().getTime();
                _this.animationFunc = requestAnimationFrame(function () {
                    var endTime = new Date().getTime();
                    timeUsed += endTime - startTime;
                    var rotateAngle =
                        _this.rotateAngle +
                        (angleChanged * (endTime - startTime)) / time;
                    if (timeUsed >= time) {
                        _this.animationRendering = false;
                        resolve();
                    } else {
                        _this.rotate(rotateAngle);
                        render(resolve, reject);
                    }
                });
            }
        },
        aniRotateBy: function (angle, ms) {
            var ms = arguments.length > 1 ? arguments[1] : 5;
            return this.aniRotate(this.rotateAngle + angle, ms);
        },
        async rotateTo(index) {
            var length = this.cards.length;
            if (index < 0) {
                index = length + (index % length);
            } else if (index >= length) {
                index = index % length;
            }
            var targetAngle = (index * this.computedAngle * 180) / Math.PI;
            var angleClockwise =
                    targetAngle + Math.ceil(this.rotateAngle / 360) * 360,
                angleCouterClockwise = angleClockwise - 360,
                targetAngle = 0;
            if (
                Math.abs(angleClockwise - this.rotateAngle) >
                Math.abs(angleCouterClockwise - this.rotateAngle)
            ) {
                targetAngle = angleCouterClockwise;
            } else {
                targetAngle = angleClockwise;
            }
            await this.aniRotate(targetAngle);
            this.rotateAngle = targetAngle;
        },
    },
    computed: {
        cardsLength: function () {
            return Math.max(this.minLimit, this.cards.length);
        },
        cards: function () {
            var cards = [],
                cardList = this.cardList;
            for (var i = 0; i < cardList.length; i++) {
                cards.push(new CompassCard(cardList[i]));
            }
            return cards;
        },
        containerStyle: function () {
            var radius = this.config.radius;
            var style = [
                `perspective: ${radius * 4}px`,
                `perspective-origin:50% -150px`,
                `height:${radius / 2 + 100}px`,
            ];
            return style.join(";");
        },
        cardStyles: function () {
            var styles = [],
                matrices = this.matrices;
            let card;
            for (var i = 0; i < this.cards.length; i++) {
                card = this.cards[i];
                var style = [
                    `width:${this.config.cardWidth}px`,
                    `height:${this.config.cardHeight}px`,
                    `transform:${matrices[i].toString()}`,
                    `z-index:${Math.ceil(matrices[i][2][3])}`,
                ];
                styles.push(style.join(";"));
            }
            return styles;
        },
        computedAngle: function () {
            return (Math.PI * 2) / this.cardsLength;
        },
        matrices: function () {
            var matrices = [];
            var length = this.cardsLength;
            var perAngle = this.computedAngle,
                rotateAngle = (-this.rotateAngle * Math.PI) / 180,
                radius = this.config.radius;
            for (var i = 0; i < length; i++) {
                var angle = perAngle * i + rotateAngle;
                var offsetX = radius * Math.sin(angle),
                    offsetY = 0,
                    offsetZ = radius * (Math.cos(angle) - 1);
                var matrix = new Matrix3d([
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    offsetX,
                    offsetY,
                    offsetZ,
                    1,
                ]);
                matrices.push(matrix);
            }

            return matrices;
        },
        index: function () {
            var angle = this.rotateAngle % 360;
            var index = parseInt((Math.PI * angle) / this.computedAngle / 180);
            var length = this.cardsLength;
            if (index < 0) {
                index = length + index;
            }
            return index;
        },
    },
};
</script>

<style lang="scss">
@import "./compass.scss";
</style>
