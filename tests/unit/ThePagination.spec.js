import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ThePagination from '@/components/ThePagination.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ThePagination', () => {
  it('ThePagination with «props»', () => {
    const total = 100;
    const limit = 12;

    const Pagination = shallowMount(ThePagination, {
      propsData: {
        total,
        limit,
      },
      stubs: ['router-link'],
      localVue,
      router,
    });

    expect(Pagination.isVueInstance()).toBeTruthy();
    expect(Pagination.props().total).toBe(total);
    expect(Pagination.props().limit).toBe(limit);
    expect(Pagination.contains('router-link-stub')).toBe(true);
  });
});
