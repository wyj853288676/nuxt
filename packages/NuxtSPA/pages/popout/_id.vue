<template>
    <widget v-if="componentId" :componentId="componentId"> </widget>
</template>
<script>
const popoutStyles = require("./popoutStyles");
export default {
    data() {
        return {
            componentId: null,
            key: "",
            origin: "",
            sourceWindow: null,
            messageListener: null,
        };
    },
    mounted() {
        this.key = this.$router.currentRoute.params.id;
        this.origin = window.origin;
        this.addMessageListener();
        this.$store.commit("addStyles", popoutStyles);
        blockRefresh();
    },
    computed: {
        themeIndex: function () {
            return this.$store.state.themeIndex;
        },
    },
    methods: {
        addMessageListener: function () {
            var _this = this,
                MessageListener = this.MessageListener;
            this.messageListener = new MessageListener({
                handler: _this.messageHandler,
            });
        },
        postMessage: function (msg = "") {
            if (!this.sourceWindow) {
                return;
            }
            console.log(msg);
            this.sourceWindow.postMessage(msg, this.origin);
        },
        getComponentId: function () {
            this.postMessage({
                action: "getComponentId",
                key: this.key,
            });
        },
        messageHandler: function (msg) {
            var sourceWindow = msg.source,
                data = msg.data;

            if (this.sourceWindow === null) {
                this.sourceWindow = sourceWindow;
                sourceWindow.addEventListener("beforeunload", function () {
                    window.close();
                });
                this.getComponentId();
            }
            var data = msg.data;
            switch (data.action) {
                case "sync":
                    var syncData = data.syncData ? data.syncData : {};
                    this.syncData(syncData);
                    break;
                case "syncTheme":
                    this.syncTheme(data);
                    break;
            }
        },
        syncData: function (syncData) {
            for (var i in syncData) {
                this[i] = syncData[i];
            }
        },
        syncTheme: function (data) {
            this.$store.commit("changeTheme", data.themeIndex);
        },
        destroyed() {
            if (this.messageListener.destroy) {
                this.messageListener.destroy();
            }
        },
    },
};

function blockRefresh() {
    document.onkeydown = function (e) {
        e = window.event || e;
        var k = e.keyCode;
        //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
        if (
            (e.ctrlKey == true && k == 82) ||
            k == 116 ||
            (e.ctrlKey == true && k == 116) ||
            k == 114
        ) {
            // e.keyCode = 0;
            // e.returnValue = false;
            // e.cancelBubble = true;
            return false;
        }
        if (k == 8) {
            e.keyCode = 0;
            e.returnValue = false;
            return false;
        }
        //屏蔽 Ctrl+n   验证可以实现效果
        if (e.ctrlKey && k == 78) {
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }
        //屏蔽F11   验证可以实现效果
        if (k == 122) {
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }
        //屏蔽 shift+F10  验证可以实现效果
        if ((e.shiftKey && k == 121) || (e.ctrlKey && k == 121)) {
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }

        //屏蔽Alt+F4
        if (e.altKey && k == 115) {
            window.showModelessDialog(
                "about:blank",
                "",
                "dialogWidth:1px;dialogheight:1px"
            );
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }
        //屏蔽 Alt+ 方向键 ← ;屏蔽 Alt+ 方向键 → ！验证
        if (e.altKey && (k == 37 || k == 39)) {
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }
    };

    //屏蔽右键菜单，！验证
    document.oncontextmenu = function (event) {
        if (window.event) {
            event = window.event;
        }
        try {
            var the = event.srcElement;
            if (
                !(
                    (the.tagName == "INPUT" &&
                        the.type.toLowerCase() == "text") ||
                    the.tagName == "TEXTAREA"
                )
            ) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    };
}
</script>
<style lang="scss">
@import "./popout.scss";
</style>