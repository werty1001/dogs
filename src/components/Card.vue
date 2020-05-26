<template>
  <article class="card">
    <div v-if="image" class="card__image">
      <img :src="image" :alt="name" loading="lazy">
    </div>
    <div v-if="name" class="card__name">
      <BaseTitle :text="name" tag="h5" />
    </div>
    <div v-if="showFavorite" class="card__favorite">
      <FavoriteButton @click="toggleFavorite" :isActive="favoriteIsActive" />
    </div>
    <BaseLink v-if="link" :href="link" :link="name" class="card__link" />
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteButton from '@/components/FavoriteButton.vue';
import BaseTitle from '@/components/BaseTitle.vue';
import BaseLink from '@/components/BaseLink.vue';

export default {
  name: 'Card',
  components: {
    FavoriteButton,
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
    image: {
      type: String,
      default: '',
    },
    showFavorite: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters([
      'favoriteHasItem',
    ]),
    favoriteIsActive() {
      return this.favoriteHasItem(this.image);
    },
  },
  methods: {
    toggleFavorite() {
      this.$store.dispatch('toggleFavorite', this.image);
      this.$emit('click:favorite');
    },
  },
};
</script>

<style lang="stylus">
.card
  position relative
  display block
  background-color $c_bg
  color #fff

  &:before
    content ''
    display block
    padding-top 100%

  &__image
    display block
    abs top left right bottom
    overflow hidden
    border-radius 8px

    img
      display block
      width 100%
      height @width
      object-fit cover
      object-position center

    &:after
      content ''
      abs top left right bottom
      background linear-gradient(1deg, #000 -5.5%, transparent 54.5%),
      linear-gradient(135deg, alpha(#000, 80%) 0, transparent 50%)
      pointer-events none
      z-index 1

  &__name
    abs bottom right
    font-size 150%
    margin 20px
    z-index 2
    &:first-letter
      text-transform uppercase

  &__favorite
    abs top left
    margin 20px
    z-index 5

  &__link
    abs top left right bottom
    border 0
    z-index 3
</style>
