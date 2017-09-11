// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import {Cascader,Input} from 'element-ui'

import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'

Vue.use(Cascader)
Vue.use(Input)

// Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
