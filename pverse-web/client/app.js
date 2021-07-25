import Vue from 'vue'
import App from './App.vue'

import Agent from './components/Agent.vue'
import Metric from './components/Metric.vue'

Vue.component('agent', Agent)
Vue.component('metric', Metric)

/* eslint-disable no-new */
new Vue({
  // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
})
