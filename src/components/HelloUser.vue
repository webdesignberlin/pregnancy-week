<template>
  <article>
    <h1>Hallo {{ user.name }}</h1>
    <slot></slot>

    <router-link :to="'result'" tag="div">
      <ui-btn type="inverted">zum Ergebnis</ui-btn>
    </router-link>
  </article>
</template>

<script>
import UiBtn from './ui/button.vue';

export default {
  name: 'HelloUser',
  components: { UiBtn },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>

<style scoped lang="scss">
  article {
    padding: 2rem;
  }
</style>
