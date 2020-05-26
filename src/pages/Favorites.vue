<template>
  <div class="app__layout">
    <BaseTitle
      text="Favorites photos"
      :data-total="favoriteCount ? favoriteCount : false"
      size="xl"
      class="content__title"
      tag="h1"
    />
    <div v-if="items.length" class="content__cards">
      <Card v-for="src in items" :image="src" :key="src" />
    </div>
    <BaseText v-else text="Favorites list is empty ..." />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Card from '@/components/Card.vue';
import BaseTitle from '@/components/BaseTitle.vue';
import BaseText from '@/components/BaseText.vue';

export default {
  name: 'FavoritePage',
  components: {
    Card,
    BaseText,
    BaseTitle,
  },
  computed: {
    ...mapState({
      favorite: 'favorite',
    }),
    ...mapGetters([
      'favoriteCount',
    ]),
    items() {
      return this.favorite.favorite;
    },
  },
};
</script>
