import Vue from "vue";
import * as _ from "lodash";
Vue.filter("capitalize", function(value) {
    return _.capitalize(value);
});
Vue.prototype.toPriceStr = toPriceStr;
Vue.filter("toPriceStr", top);

function toPriceStr(value) {
    if (!value) {
        return "";
    }
    if (!/^[+-]{0,1}\d+(.\d){0,1}\d*$/.test(value)) {
        return "";
    }
    value = String(value);
    let results = [],
        hasSymbol = /^[+-]/.test(value),
        valueArr = value.split('.'),
        decimalPart = hasSymbol ? valueArr[0].slice(1) : valueArr[0],
        integerPart = valueArr[1] ? valueArr[1] : [],
        intCounter = 0;

    for (let i = (decimalPart.length - 1); i >= 0; i--) {
        results.unshift(decimalPart[i]);
        intCounter++;
        if (intCounter === 3 && i != 0) {
            intCounter = 0;
            results.unshift(',');
        }
    }
    if (hasSymbol) {
        results.unshift(value[0]);
    }
    return results.concat(integerPart).join('');
}