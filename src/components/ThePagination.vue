<template>
  <nav
    v-if="pages.length"
    class="pagination"
    :class="{ pagination_first_page: activePage === 1 }"
  >
    <router-link
      v-for="page in pages"
      :key="page"
      :to="getUrl(page)"
      class="pagination__link"
      v-text="String(page)"
    />
  </nav>
</template>

<script>
export default {
  name: 'ThePagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    activePage() {
      return parseInt(this.$route.query.page || 1, 10);
    },
    pages() {
      const { activePage, limit, total } = this;

      if (limit > total) return [];

      const count = Math.ceil(total / limit);
      const pages = [];

      if (count > 6) {
        if (activePage <= 3) {
          pages.push(1, 2, 3, 4, count);
        } else if (activePage + 2 >= count) {
          pages.push(1, count - 3, count - 2, count - 1, count);
        } else {
          pages.push(1, activePage - 1, activePage, activePage + 1, count);
        }
      } else {
        for (let i = 0; i < count; i += 1) {
          pages.push(i + 1);
        }
      }

      return pages;
    },
  },
  methods: {
    getUrl(page) {
      const params = Object.entries({
        ...this.$route.query,
        page,
      }).map((el) => el.join('=')).join('&');
      return params ? `?${params}` : '';
    },
  },
};
</script>

<style lang="stylus">
.pagination
  position relative
  display flex
  flex-flow row wrap
  align-items center
  justify-content center

  &__link
    display block
    width 40px
    height @width
    line-height @height
    font-size 13px
    color $c_text
    text-decoration none
    text-align center
    background-color alpha(#fff, 15%)
    border 0
    border-radius 3px
    margin 5px
    &:hover
      background-color #fff
      color $c_bg

    ~/_first_page &:first-child
    &._active_exact
      font-weight 700
      color $c_bg
      background-color #fff
      pointer-events none
</style>
