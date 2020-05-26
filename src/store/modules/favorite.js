
export const LOCAL_STORAGE_FAVORITE_KEY = 'favorite';

export default {
  state: {
    favorite: [],
  },
  getters: {
    favoriteHasItem({ favorite }) {
      return (item) => favorite.includes(item);
    },
    favoriteCount({ favorite }) {
      return favorite.length;
    },
  },
  actions: {
    loadFavorite({ commit }) {
      const favorite = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY) || '[]');
      commit('updateStoreFavorite', favorite);
    },
    saveFavorite({ state }) {
      const { favorite } = state;
      localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(favorite));
    },
    toggleFavorite({ state, commit, dispatch }, item) {
      const { favorite } = state;
      const set = new Set(favorite);
      set[set.has(item) ? 'delete' : 'add'](item);
      commit('updateStoreFavorite', Array.from(set));
      dispatch('saveFavorite');
    },
  },
  mutations: {
    updateStoreFavorite(state, favorite) {
      state.favorite = favorite;
    },
  },
};
