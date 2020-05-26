
import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue');
const Breed = () => import(/* webpackChunkName: "breed" */ '@/pages/Breed.vue');
const Breeds = () => import(/* webpackChunkName: "breeds" */ '@/pages/Breeds.vue');
const Favorites = () => import(/* webpackChunkName: "favorites" */ '@/pages/Favorites.vue');
const PageNotFound = () => import(/* webpackChunkName: "404" */ '@/pages/404.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '_active',
  linkExactActiveClass: '_active_exact',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/breeds',
      name: 'Breeds',
      component: Breeds,
    },
    {
      path: '/breeds/:breed',
      name: 'Breed',
      component: Breed,
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
