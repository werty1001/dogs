<template>
  <div class="app__layout">
    <BaseTitle
      text="Random breeds"
      size="xl"
      class="content__title"
      tag="h1"
    />
    <BaseSpinner v-if="isLoading && !items.length" :size="40" class="content__spinner" />
    <div v-if="items.length" class="content__cards content__cards_poster">
      <Card v-for="item in items" :key="item.name" :link="`/breeds/${item.name}`" v-bind="item" />
    </div>
    <div class="content__action">
      <BaseButton text="Show another breeds" @click="getRandomBreeds" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import BaseTitle from '@/components/BaseTitle.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSpinner from '@/components/BaseSpinner.vue';
import scrollTop from '@/helpers/scrollTop';

export default {
  name: 'Home',
  components: {
    BaseTitle,
    BaseButton,
    BaseSpinner,
    Card,
  },
  data() {
    return {
      items: [],
      isLoading: false,
    };
  },
  created() {
    this.getRandomBreeds();
  },
  methods: {
    getRandomBreeds() {
      this.isLoading = true;
      this.$store.dispatch('getRandomBreeds', { count: 10 })
        .then((breeds) => {
          this.items = breeds;
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false;
        });
      scrollTop();
    },
  },
};
</script>
