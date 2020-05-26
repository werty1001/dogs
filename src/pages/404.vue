<template>
  <div class="app__layout">
    <div class="content__error">
      <BaseTitle text="404" />
    </div>
  </div>
</template>

<script>
import BaseTitle from '@/components/BaseTitle.vue';

export default {
  name: 'NotFoundPage',
  components: {
    BaseTitle,
  },
};
</script>
