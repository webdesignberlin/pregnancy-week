import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    calculatedBirthDate: null,
    user: {
      name: null,
    },
  },
  mutations: {
    updateName(state, object) {
      this.replaceState(Object.assign(state, object));
    },
    update(state, date) {
      // console.log(state);
      // localStorage.setItem('store', JSON.stringify(date));
      // this.replaceState(date);
      this.replaceState(Object.assign(state, { calculatedBirthDate: date }));
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        // this.replaceState(JSON.parse(localStorage.getItem('store')));
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      }
    },
  },
  actions: {

  },
});
