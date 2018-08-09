import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Calculate from './views/Calculate.vue';
import Result from './views/Result.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/calculate',
      name: 'calculate',
      component: Calculate,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
    },
  ],
});
