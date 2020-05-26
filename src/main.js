
import Vue from 'vue';

import axios from '@/plugins/axios';
import staticData from '@/plugins/staticData';

import router from '@/router/index';
import store from '@/store/index';
import App from '@/App.vue';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
store.$axios = axios;

Vue.use(staticData);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
