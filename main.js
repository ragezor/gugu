import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	Global:{
		url: 'https://www.doaho.work/'
	}
})
app.$mount()
