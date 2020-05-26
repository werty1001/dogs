<template>
  <div class="app__layout">
    <BaseTitle
      :text="title"
      :data-total="total"
      size="xl"
      class="content__title"
      tag="h1"
    />
    <BaseSpinner v-if="isLoading && !items.length" :size="40" class="content__spinner" />
    <div class="content__cards">
      <Card v-for="src in items" :image="src" :key="src" />
    </div>
    <ThePagination
      :total="total"
      :limit="limit"
      class="content__pagination"
    />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import BaseTitle from '@/components/BaseTitle.vue';
import ThePagination from '@/components/ThePagination.vue';
import BaseSpinner from '@/components/BaseSpinner.vue';

export default {
  name: 'BreedPage',
  components: {
    Card,
    BaseTitle,
    BaseSpinner,
    ThePagination,
  },
  data() {
    return {
      items: [],
      total: 0,
      limit: 12,
      isLoading: false,
    };
  },
  computed: {
    title() {
      return `${this.$route.params.breed} photos`;
    },
    query() {
      return {
        page: parseInt(this.$route.query.page || 1, 10),
        breed: this.$route.params.breed,
        limit: this.limit,
      };
    },
  },
  watch: {
    query() {
      this.getItems();
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.isLoading = true;
      this.$store.dispatch('getAllBreedImages', this.query)
        .then(({ items, total }) => {
          this.items = items;
          this.total = total;
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
