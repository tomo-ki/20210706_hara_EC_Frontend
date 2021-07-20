import Vue from 'vue'

Vue.filter('addComma', function (value) {
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  } else {
    return '';
  }
})