import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/* 引入公用filter */
import filter from '@/mixin/filter'
import Print from 'vue-print-nb'
// import store from './vuex/store'
import router from './router'
import './permisson'
import '../mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Print)

Vue.mixin(filter) // 混入公用filter

new Vue({
  render: h => h(App),
  router
  // store: store
}).$mount('#app')
