<template>
  <button
    type="button"
    class="favorite-button"
    :class="{
      'favorite-button_active': isActive,
    }"
    v-on="$listeners"
  >
    <BaseIcon name="favorite" class="favorite-button__icon" />
  </button>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'FavoriteButton',
  components: {
    BaseIcon,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.favorite-button
  display block
  width 24px
  height @width
  background none
  padding 0
  margin 0
  border 0
  color inherit
  outline none

  &_active
  &:hover
   color #f70f0f

  &_active
    animation scale 500ms ease 0s 1 normal backwards

  &__icon
    width 100%
    height 100%
    [data-fill]
      fill none
      ~/_active &
        fill currentColor
</style>
