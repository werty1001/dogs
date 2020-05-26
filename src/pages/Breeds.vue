<template>
  <div class="app__layout">
    <BaseTitle
      text="All breeds"
      size="xl"
      class="content__title"
      tag="h1"
    />
    <div class="content__letters">
      <div
        v-for="(breeds, letter) in breedsByAlphabet"
        :key="letter"
        class="content__letter"
        :id="letter"
      >
        <BaseTitle :text="letter" size="l" :isUp="true" class="content__letter-title" />
        <div class="content__breeds">
          <BreedCard
            v-for="breed in breeds"
            :ref="`breed_${breed}`"
            :data-breed="`breed_${breed}`"
            :key="breed"
            :lazy="true"
            :name="breed"
            :link="`/breeds/${breed}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTitle from '@/components/BaseTitle.vue';
import BreedCard from '@/components/BreedCard.vue';

export default {
  name: 'BreedsPage',
  components: {
    BaseTitle,
    BreedCard,
  },
  computed: {
    ...mapGetters([
      'breedsByAlphabet',
    ]),
  },
  staticData: () => ({
    observer: null,
  }),
  mounted() {
    this.initObserver();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    initObserver() {
      this.observer = new IntersectionObserver(this.observerCallback, { threshold: 0.1 });
      const breedsKeys = Object.keys(this.$refs).filter((key) => key.substring(0, 6) === 'breed_');
      const breedsComponents = breedsKeys.map((key) => this.$refs[key]).flat();
      breedsComponents.forEach((component) => this.observer.observe(component.$el));
    },
    observerCallback(entries, observer) {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting || !target.dataset.breed) return;
        const { breed } = target.dataset;
        const [component] = this.$refs[breed];
        if (component) {
          component.loadImages();
          observer.unobserve(component.$el);
        }
      });
    },
  },
};
</script>
