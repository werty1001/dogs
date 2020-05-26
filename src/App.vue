<template>
  <div id="app" class="app">
    <TheHeader />
    <TheContent />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheContent from '@/components/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheContent,
  },
  created() {
    this.$store.dispatch('getAllBreeds');
    this.$store.dispatch('loadFavorite');
  },
};
</script>

<style lang="stylus">
@import '~@/assets/stylus/normalize'
@import '~@/assets/stylus/keyframes'

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap')

body
  background-color #1B1A1F

.app
  position relative
  display block
  width 100%
  min-height 100%
  font-family $f_family
  font-size $f_size
  color $c_text
  font-weight $f_weight
  line-height 1
  background linear-gradient(180deg, #1B1A1F 0%, #111013 100%)

  &__layout
    max-width 480px
    padding 0 20px
    margin 0 auto
    +mq('md')
      max-width $layout * 1px

#nprogress
  .bar
    background $c_link
  .peg
    box-shadow 0 0 10px $c_link, 0 0 5px $c_link
</style>
