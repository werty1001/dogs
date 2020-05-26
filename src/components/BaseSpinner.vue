<template functional>
  <div class="spinner" :class="$options.getModifiers(props, data)">
    <svg
      class="spinner__circle"
      :viewBox="`0 0 ${props.size} ${props.size}`"
      :width="props.size"
      :height="props.size"
    >
      <defs>
        <clipPath :id="`header_${props.id}`">
          <rect x="0" y="0" width="100%" height="50%" />
        </clipPath>
        <clipPath :id="`footer_${props.id}`">
          <rect x="0" y="50%" width="100%" height="50%" />
        </clipPath>
        <linearGradient :id="`gradient_header_${props.id}`">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.5" />
          <stop offset="100%" stop-color="currentColor" stop-opacity="1" />
        </linearGradient>
        <linearGradient :id="`gradient_footer_${props.id}`">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.5" />
          <stop offset="30%" stop-color="currentColor" stop-opacity="0.3" />
          <stop offset="90%" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
      </defs>
      <circle
        :cx="props.size / 2"
        :cy="props.size / 2"
        :r="props.size / 2 - props.stroke / 2"
        :stroke-width="props.stroke"
        :stroke="`url(#gradient_header_${props.id})`"
        :clip-path="`url(#header_${props.id})`"
        fill="none"
      />
      <circle
        :cx="props.size / 2"
        :cy="props.size / 2"
        :r="props.size / 2 - props.stroke / 2"
        :stroke-width="props.stroke"
        :stroke="`url(#gradient_footer_${props.id})`"
        :clip-path="`url(#footer_${props.id})`"
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BaseSpinner',
  props: {
    size: {
      type: Number,
      default: 24,
    },
    stroke: {
      type: Number,
      default: 2,
    },
    id: {
      type: Number,
      default: () => Date.now(),
    },
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
.spinner
  display flex
  flex-flow row wrap
  align-items center
  justify-content center
  padding 1em

  &__circle
    display block
    animation rotate 1.4s linear infinite
    pointer-events none
</style>
