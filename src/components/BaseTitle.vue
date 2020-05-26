<template functional>
  <component
    :is="props.tag"
    class="title"
    :class="$options.getModifiers(props, data)"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    tag: {
      type: String,
      default: 'h6',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    isUp: {
      type: Boolean,
      default: false,
    },
  },
  getModifiers(props, data) {
    const modifiers = {
      title_up: props.isUp,
    };
    if (props.size) modifiers[`title_size_${props.size}`] = true;
    if (data.staticClass) modifiers[data.staticClass] = true;
    return modifiers;
  },
};
</script>

<style lang="stylus">
.title
  display block
  font-size 1em
  font-weight 700
  line-height 1.2
  letter-spacing .01em
  margin 0

  &[data-total]:after
    content attr(data-total)
    display inline-block
    vertical-align middle
    font-size 10px
    font-weight 400
    padding 0.3em 1em
    border-radius 1em
    background-color alpha(#fff, 20%)
    margin-top -2em
    margin-left 1em

  &_up
    text-transform uppercase

  &_size_s
    font-size 14px

  &_size_m
    font-size 18px
    +mq('sm')
      font-size 19px
    +mq('md')
      font-size 20px

  &_size_l
    font-size 20px
    +mq('sm')
      font-size 21px
    +mq('md')
      font-size 22px
    +mq('lg')
      font-size 24px

  &_size_xl
    font-size 24px
    +mq('sm')
      font-size 28px
    +mq('md')
      font-size 36px
    +mq('lg')
      font-size 42px
</style>
