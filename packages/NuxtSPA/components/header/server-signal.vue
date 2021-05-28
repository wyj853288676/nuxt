<template>
    <div class="nts-server-signal" :level="signalLevel">
        <i class="nts-server-signal-line"></i>
    </div>
</template>
<script>
export default {
    props: {
        signalLevel: {
            type: Number,
            default: function () {
                return 4;
            },
        },
    },
};
</script>
<style lang="scss">
.nts-server-signal {
    width: 1.5em;
    height: 1em;
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    color: #67c23a !important;
    i {
        display: inline-block;
        width: calc(0.1em + 2px);
        height: 1em;
        background-color: currentColor;
        box-shadow: calc(0.1em + 3px) -0.25em 0px currentColor,
            calc(0.2em + 6px) -0.5em 0px currentColor,
            calc(0.3em + 9px) -0.7em 0px currentColor;
        transform: translateY(0.8em);
        transition: all 0.3s;
    }
}
.nts-server-signal[level="3"] {
    i {
        box-shadow: calc(0.1em + 3px) -0.25em 0px currentColor,
            calc(0.2em + 6px) -0.5em 0px currentColor,
            calc(0.3em + 9px) -0.7em 0px #ccc;
    }
}
.nts-server-signal[level="2"] {
    color: #e6a23c !important;
    i {
        box-shadow: calc(0.1em + 3px) -0.25em 0px currentColor,
            calc(0.2em + 6px) -0.5em 0px #ccc, calc(0.3em + 9px) -0.7em 0px #ccc;
    }
}
.nts-server-signal[level="1"] {
    color: #e63c3c !important;
    i {
        box-shadow: calc(0.1em + 3px) -0.25em 0px #ccc,
            calc(0.2em + 6px) -0.5em 0px #ccc, calc(0.3em + 9px) -0.7em 0px #ccc;
    }
}
</style>