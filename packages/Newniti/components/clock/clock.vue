<template>
    <div>
        {{timeString}}
    </div>
</template>
<script>
export default {
    props:{
        time:{
            type: Number,
            default:function(){
                return Date.now();
            }
        } 
    },
    data() {
        return {
            
        }
    },
    computed:{
        timeString:function(){
            var hour = this.date.getHours(),
                minute = this.date.getMinutes(),
                second = this.date.getSeconds();
            hour = hour < 10 ? (0 + '' + hour) : hour;
            minute = minute < 10 ? (0 + '' + minute) : minute;
            second = second < 10 ? (0 + '' + second) : second;

            return `${this.date.toDateString()} ${hour}:${minute}:${second}`;
        },
        date:function(){
            return new Date(this.time);
        }
    }
}
</script>
<style lang="scss">
    @import "./clock.scss";
</style>