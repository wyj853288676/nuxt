import Vue from "vue";
import baseWidget from "@/components/baseWidget/widget.vue";
import priceCard from "@/components/widgets/priceCard/priceCard.vue";

//register the vue component
Vue.component("base-widget", baseWidget);
Vue.component("priceCard", priceCard);

//register the widget class
Vue.prototype.widgets = {
    priceCard: require("@/assets/js/widget/priceCard.js"),
};