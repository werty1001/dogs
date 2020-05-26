<template>
  <main class="content">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'TheContent',
};
</script>

<style lang="stylus">
.content
  display block
  min-height calc(100vh - 110px)
  padding 30px 0 40px 0
  +mq('md')
    padding 50px 0 70px 0

  &__title.title
    margin-bottom 1em
    &:first-letter
      text-transform uppercase

  &__spinner
    height 40vh
    align-items flex-start

  &__cards
    .card
      &:before
        padding-top 80%
    +mq(0,'sm')
      .card
        margin-top 10px

    +mq('sm')
      display grid
      grid-template-columns 1fr 1fr
      grid-column-gap 10px
      grid-row-gap 10px
      &_poster
        .card:first-child
          grid-column 1 / -1
          &:before
            padding-top 44%

    +mq('md')
      grid-column-gap 20px
      grid-row-gap 20px

    +mq('lg')
      grid-template-columns 1fr 1fr 1fr
      grid-column-gap 30px
      grid-row-gap 30px
      .card
        animation fadeInBottom 500ms ease 0s 1 normal both
        for i in (1..12)
          &:nth-child({i})
            animation-delay i * 0.1s

  &__action
    margin-top 35px
    text-align center

  &__pagination
    margin-top 35px

  &__error
    font-size 20vw
    text-align center

  &__breeds

    +mq(0,'sm')
      .breed
        margin-top 10px

    +mq('sm')
      display grid
      grid-template-columns 1fr 1fr
      grid-column-gap 10px
      grid-row-gap 10px

    +mq('lg')
      grid-template-columns 1fr 1fr 1fr 1fr

  &__letter + &__letter
    margin-top 30px
    +mq('md')
      margin-top 50px

  &__letter-title.title
    color $c_dim
    margin-bottom 0.7em
    &:before
      content ''
      display inline-block
      vertical-align middle
      width 30px
      height 1px
      background-color currentColor
      margin-right 0.4em
      margin-top -3px
</style>
