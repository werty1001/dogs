<template functional>
  <component
    :is="$options.getTag(props)"
    class="link"
    :class="$options.getModifiers(props, data)"
    v-bind="$options.getAttributes(data, props)"
    v-on="listeners"
  >
    <slot>
      {{ props.text }}
    </slot>
  </component>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    href: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    isDim: {
      type: Boolean,
      default: false,
    },
  },
  getTag({ href }) {
    const isExternal = this.isExternal(href);
    const isAnchor = this.isAnchor(href);
    if (href && !isAnchor && !isExternal) return 'router-link';
    if (href) return 'a';
    return 'button';
  },
  getModifiers(props, data) {
    const modifiers = {
      link_dim: props.isDim,
      ...data.class,
    };
    if (data.staticClass) modifiers[data.staticClass] = true;
    return modifiers;
  },
  getAttributes({ attrs }, { href }) {
    const attributes = {};
    const isExternal = this.isExternal(href);
    const isAnchor = this.isAnchor(href);

    if (isExternal) {
      attributes.target = '_blank';
      attributes.href = href;
    }
    if (isAnchor) {
      attributes.href = href;
    }
    if (href && !isAnchor && !isExternal) {
      attributes.to = href;
    }
    if (!href) {
      attributes.type = 'button';
    }

    return { ...attributes, ...attrs };
  },
  isAnchor(href = '') {
    return /^(#|tel:|mailto:)/i.test(href);
  },
  isExternal(str = '') {
    return /^(?:https?:)?\/\//i.test(str);
  },
};
</script>

<style lang="stylus">
.link
  display inline
  color $c_link
  border 0
  padding 0
  line-height 1
  text-decoration none
  background none
  border-bottom dotted 1px alpha(@color, 30%)
  transition color .25s, border .25s
  outline none

  &[href]
    border-bottom-style solid

  &_dim
    color $c_dim
    border-bottom-color alpha(@color, 30%)

  &:hover
    color darken(@color, 20%)
    border-color alpha(@color, 50%)
    border-bottom-style solid
</style>
