
import Vue from 'vue';
import Vuex from 'vuex';

import breeds from './modules/breeds';
import favorite from './modules/favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    breeds,
    favorite,
  },
});
