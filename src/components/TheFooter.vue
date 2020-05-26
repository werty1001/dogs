<template>
  <footer class="footer">
    <div class="footer__inner app__layout">
      © 2014 – {{ year }} prettydogs.com
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  staticData: () => ({
    year: new Date().getFullYear(),
  }),
};
</script>

<style lang="stylus">
.footer
  display block
  font-size 12px
  color $c_dim
  padding 3em 0
  text-align center
  border-top solid 1px alpha(#fff, 5%)
</style>
