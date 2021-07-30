import Vue from 'vue'

Vue.filter('addComma', function (value) {
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  } else {
    return '';
  }
})

import format from 'date-fns/format'
Vue.filter('formatDate', (date) => {
  if (date) {
    return format(date, 'yyyy年MM月dd日');
  } else {
    return '';
  }
})