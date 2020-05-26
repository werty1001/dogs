<template functional>
  <component
    :is="$options.getTag(props)"
    class="button"
    :class="$options.getModifiers(props, data)"
    v-bind="$options.getAttributes(data, props)"
    v-on="listeners"
  >
    <span>
      <slot>
        {{ props.text }}
      </slot>
    </span>
  </component>
</template>

<script>
import BaseLink from '@/components/BaseLink.vue';

export default {
  name: 'BaseButton',
  props: {
    href: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    isRound: {
      type: Boolean,
      default: true,
    },
  },
  getTag({ href }) {
    if (href) return BaseLink;
    return 'button';
  },
  getAttributes({ attrs }, { href }) {
    const attributes = {};
    if (href) {
      attributes.href = href;
    } else {
      attributes.type = 'button';
    }
    return { ...attributes, ...attrs };
  },
  getModifiers(props, data) {
    const modifiers = {
      button_round: props.isRound,
    };
    if (data.staticClass) modifiers[data.staticClass] = true;
    if (props.size) modifiers[`button_size_${props.size}`] = true;
    return modifiers;
  },
};
</script>

<style lang="stylus">
.button
  max-width 100%
  display inline-flex
  align-items center
  vertical-align top
  font-family inherit
  font-size 14px
  font-weight 700
  letter-spacing .025em
  text-transform uppercase
  text-decoration none
  text-align center
  background-color $c_link
  color #fff
  padding 0 2.25em
  height 50px
  border 0
  border-radius 3px
  transition background .4s, color .4s
  outline none

  &:hover
    text-decoration none
    background-color darken(@background-color, 15%)
    color @color

  &_size_s
    font-size 12px
    height 40px

  &_size_xs
    font-size 10px
    padding-left 1.8em
    padding-right @padding-left
    height 30px

  &_round
    padding-left 2.25em
    padding-right @padding-left
    border-radius 32px
    padding-bottom 1px
</style>
