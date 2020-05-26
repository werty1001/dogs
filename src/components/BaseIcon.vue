<template functional>
  <component
    :is="$options.getIcon(props.name)"
    class="icon"
    :class="$options.getModifiers(props, data)"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  getIcon(name) {
    return require(`@/assets/icons/${name}.svg`); // eslint-disable-line
  },
  getModifiers(props, data) {
    const modifiers = {
      ...data.class,
    };
    if (data.staticClass) modifiers[data.staticClass] = true;
    return modifiers;
  },
};
</script>

<style lang="stylus">
.icon
  display block
  fill currentColor
</style>
