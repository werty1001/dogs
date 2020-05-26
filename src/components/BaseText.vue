<template functional>
  <div class="text" :class="$options.getModifiers(props, data)">
    <slot>
      {{ props.text }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BaseText',
  props: {
    text: {
      type: String,
      default: '',
    },
    isDim: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
  },
  getModifiers(props, data) {
    const modifiers = {
      text_dim: props.isDim,
    };
    if (props.size) modifiers[`text_size_${props.size}`] = true;
    if (data.staticClass) modifiers[data.staticClass] = true;
    return modifiers;
  },
};
</script>

<style lang="stylus">
.text
  display block
  margin 0
  padding 0
  font-size 1em
  line-height typeof( $f_height ) == 'unit' ? $f_height : 1.6
  letter-spacing .007em
</style>
