<template>
  <article class="breed">
    <div class="breed__name">
      <BaseTitle :text="name" />
    </div>
    <div class="breed__images" :class="{ breed__images_loading: isLoading }">
      <div v-for="(image, i) in images" :key="i" class="breed__image">
        <img :src="image" :alt="name" loading="lazy">
      </div>
    </div>
    <BaseLink v-if="link" :href="link" class="breed__more">
      All {{ name }} photos &rarr;
    </BaseLink>
  </article>
</template>

<script>
import BaseTitle from '@/components/BaseTitle.vue';
import BaseLink from '@/components/BaseLink.vue';

export default {
  name: 'BreedCard',
  components: {
    BaseTitle,
    BaseLink,
  },
  props: {
    link: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: true,
      images: [
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      ],
    };
  },
  created() {
    if (!this.lazy) {
      this.loadImages();
    }
  },
  methods: {
    loadImages() {
      this.isLoading = true;
      this.$store.dispatch('getRandomBreedImages', { breed: this.name })
        .then((images) => {
          this.images = images;
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="stylus">
.breed
  position relative
  display block
  background-color #fff
  border-radius 4px
  color $c_bg

  &__name
  &__more
    display block
    padding 15px 20px
    +mq('md')
      padding 20px 30px

  &__name
    font-size 20px
    &:first-letter
      text-transform uppercase
    +mq('md')
      font-size 24px

  &__more
    font-size 14px
    color $c_dim
    border 0

    &:before
      content ''
      abs top left right bottom
      display block
      z-index 5

  &__images
    position relative
    display flex
    flex-flow row wrap
    overflow hidden
    background-color #ddd

    &:before
      content ''
      display none
      abs top left 50% bottom
      width 500%
      margin-left -250%
      background linear-gradient(to right,
        alpha(#fff, 0) 46%,
        alpha(#fff, 0.35) 50%,
        alpha(#fff, 0) 54%
      ) 50% 50%
      pointer-events none
      z-index 1

    &_loading
      img
        opacity 0
      &:before
        display block
        animation placeholder 1000ms linear infinite

  &__image
    position relative
    display block
    flex-grow 1
    flex-basis 0
    max-width 50%
    z-index 3

    &:before
      content ''
      display block
      padding-top 76%

    img
      display block
      abs top left
      width 100%
      height 100%
      object-fit cover
      object-position center
      transition opacity 500ms ease-in
</style>
