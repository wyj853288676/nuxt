import Vue from 'vue';
import Vuex from 'vuex';
import css from 'css';
import _ from 'lodash';
import dashboard from '@/components/dashboard/dashboard.vue';
import compass from '@/components/compass/compass.vue';
import mainContainer from '@/components/mainContainer/mainContainer.vue';
import sidebar from '@/components/sidebar/sidebar.vue';
import uiConfig from '@/components/uiConfig/uiConfig.vue';
import priceNumber from '@/components/priceNumber/priceNumber.vue';
import header from '@/components/header/header.vue';
import clock from '@/components/clock/clock.vue';
const am4core = require("@amcharts/amcharts4/core");
const am4charts = require("@amcharts/amcharts4/charts");
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import light from '@/components/light/light.vue';

import StyleNode from '@/assets/js/styleNode.js';
import MessageListener from '@/assets/js/messageListener.js';
import PopoutWindow from '@/assets/js/popoutWindow.js';
import Ping from '@/assets/js/Ping.js';
import BezierCurve from '@/assets/js/BezierCurve.js'



Vue.component('nts-dashboard', dashboard);
Vue.component('nts-compass', compass);
Vue.component('nts-main-container', mainContainer);
Vue.component('nts-sidebar', sidebar);
Vue.component('nts-header', header);
Vue.component('nts-clock', clock);


Vue.component('ui-config', uiConfig);
Vue.component('price-number', priceNumber);
Vue.component('nts-light', light);


Vue.prototype._ = _;
Vue.prototype.css = css;
Vue.prototype.StyleNode = StyleNode;
Vue.prototype.MessageListener = MessageListener;
Vue.prototype.PopoutWindow = PopoutWindow;
Vue.prototype.Ping = Ping;
Vue.prototype.am4core = am4core;
Vue.prototype.am4charts = am4charts;
Vue.prototype.am4themes_animated = am4themes_animated;
Vue.prototype.BezierCurve = BezierCurve;

