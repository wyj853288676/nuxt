import Vue from 'vue';
import widget from '@/components/widgets/baseWidget/widget.vue';
import thumbnail from '@/components/widgets/baseThumbnail/thumbnail.vue';
import marketPrice from '@/components/widgets/marketPrice/marketPrice.vue';
import mpThumbnail from '@/components/widgets/marketPrice/mp-thumbnail.vue';

import creditStatus from '@/components/widgets/creditStatus/creditStatus.vue';
import csThumbnail from '@/components/widgets/creditStatus/credit-status-thumbnail.vue';

// vm market with book
import vwapMarket from '@/components/widgets/vwapMarket/vwap-market-with-book.vue';
import vwapMarketThumbnail from '@/components/widgets/vwapMarket/vmwb-thumbnail.vue';

//CCY Pair Graph
import ccyPairGraph from '@/components/widgets/ccyPairGraph/ccyPairGraph.vue';
import cpgThumbnail from '@/components/widgets/ccyPairGraph/cpg-thumbnail.vue';

// CCY Pair Selection
import ccyPairSelection from '@/components/widgets/ccyPairSelection/ccyPairSelection.vue';
import cpsThumbnail from '@/components/widgets/ccyPairSelection/cps-thumbnail.vue';

// Order Dashboard
import orderDashboard from '@/components/widgets/orderDashboard/orderDashboard.vue';
import odThumbnail from '@/components/widgets/orderDashboard/od-thumbnail.vue';



Vue.component('widget', widget);
Vue.component('thumbnail', thumbnail);

Vue.component('marketPrice', marketPrice);
Vue.component('mp-thumbnail', mpThumbnail);


Vue.component('creditStatus', creditStatus);
Vue.component('credit-status-thumbnail', csThumbnail);

Vue.component('vwapMarketWithBook', vwapMarket);
Vue.component('vmwb-thumbnail', vwapMarketThumbnail);


Vue.component('ccyPairGraph', ccyPairGraph);
Vue.component('cpg-thumbnail', cpgThumbnail);

Vue.component('ccyPairSelection', ccyPairSelection);
Vue.component('cps-thumbnail', cpsThumbnail);

Vue.component('orderDashboard', orderDashboard);
Vue.component('od-thumbnail', odThumbnail);