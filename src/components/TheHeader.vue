<template>
  <header class="header">
    <div class="header__inner app__layout">
      <div class="header__links">
        <BaseLink :href="isHomePage ? '' : '/'" class="header__logo">
          <BaseIcon name="logo" />
        </BaseLink>
        <BaseLink v-if="!isBreedsPage" href="/breeds" class="header__link">
          <span>All breeds</span>
          <i>{{ breedsCount }}</i>
        </BaseLink>
      </div>
      <div v-if="isFavoritePage" class="header__side">
        <BaseLink href="/favorites" class="header__favorite-link">
          <BaseIcon name="favorite" class="header__favorite-icon" />
          Favorites photos
          <span v-if="favoriteCount" class="header__favorite-count">{{ favoriteCount }}</span>
        </BaseLink>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLink from '@/components/BaseLink.vue';
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'TheHeader',
  components: {
    BaseLink,
    BaseIcon,
  },
  computed: {
    ...mapGetters([
      'favoriteCount',
      'breedsCount',
    ]),
    isFavoritePage() {
      return this.$route.name !== 'Favorites';
    },
    isHomePage() {
      return this.$route.name === 'Home';
    },
    isBreedsPage() {
      return this.$route.name === 'Breeds';
    },
  },
};
</script>

<style lang="stylus">
.header
  display block
  background $c_bg
  padding 15px 0
  box-shadow 0px 8px 16px rgba(0, 0, 0, 0.55)

  +mq('md')
    padding 34px 0

  &__inner
    display flex
    flex-flow row wrap
    align-items center

  &__logo
    padding-bottom 4px
    &:not([href])
      pointer-events none

  &__links
    display flex
    flex-flow row wrap
    align-items center
    +mq(0,'md')
      flex 0 0 100%
      max-width 100%

  &__link
    position relative
    display block
    font-size 14px
    color #fff
    text-align center
    text-transform uppercase
    border solid 1px alpha(#fff, 50%)
    border-radius 30px
    margin-left auto
    padding 2px
    +mq('md')
      margin-left 3em
    span
      position relative
      top 1px
      padding 0 1em
      +mq('md')
        padding 0 1.25em
    i
      display inline-block
      vertical-align middle
      background-color #fff
      font-size 11px
      height 24px
      line-height @height
      padding 0 0.5em
      border-radius 30px
      color $c_bg
      +mq('md')
        padding 0 1em

    &:hover
      color $c_dim
      border-color $c_dim

  &__side
    +mq(0,'md')
      flex 0 0 100%
      max-width 100%
      text-align center
      margin-top 1em
    +mq('md')
      margin-left auto

  &__favorite-link
    color $c_dim
    border 0

  &__favorite-icon
    display inline-block
    vertical-align middle
    margin-right 0.25em
    margin-top -2px

  &__favorite-count
    display inline-block
    vertical-align middle
    height 16px
    line-height @height
    background-color $c_link
    color #fff
    font-family Arial
    font-size 12px
    padding 0 0.3em
    border-radius 2px
    margin-left 0.5em
    margin-top -2px
</style>
