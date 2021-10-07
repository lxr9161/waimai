import Vue from 'vue'
import App from './App'
import Request from './utils/request'

// 引入全局uView
// import uView from 'uview-ui';
// Vue.use(uView);

Vue.config.productionTip = false
Vue.use(Request)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
