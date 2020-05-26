
export default {
  state: {
    breeds: [],
  },
  getters: {
    breedsByAlphabet({ breeds }) {
      return breeds.reduce((acc, breed) => {
        const firstLetter = breed.charAt(0).toLowerCase();
        const letterItems = acc[firstLetter] || [];
        acc[firstLetter] = [...letterItems, breed];
        return acc;
      }, {});
    },
    breedsCount({ breeds }) {
      return breeds.length;
    },
  },
  actions: {
    getAllBreeds({ commit }) {
      return this.$axios.get('breeds/list/all')
        .then(({ message }) => {
          const breeds = Object.keys(message);
          commit('updateStoreBreeds', breeds);
          return breeds;
        });
    },
    getAllBreedImages(ctx, { breed, page, limit }) {
      return this.$axios.get(`breed/${breed}/images`)
        .then(({ message }) => ({
          items: message.slice((page - 1) * limit, page * limit),
          total: message.length,
        }));
    },
    async getRandomBreeds({ state, dispatch }, { count = 10 }) {
      let { breeds } = state;
      if (breeds.length === 0) {
        breeds = await dispatch('getAllBreeds');
      }
      const randomBreeds = [...breeds].sort(() => Math.random() - Math.random()).slice(0, count);
      const promises = randomBreeds.map((breed) => dispatch('getRandomBreedImages', { breed, count: 1 })
        .then(([firstImage]) => ({ name: breed, image: firstImage })));
      return Promise.all(promises);
    },
    getRandomBreedImages(ctx, { breed, count = 2 }) {
      return this.$axios.get(`breed/${breed}/images/random/${count}`)
        .then(({ message }) => message);
    },
  },
  mutations: {
    updateStoreBreeds(state, breeds) {
      state.breeds = breeds;
    },
  },
};
