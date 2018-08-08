<template>
  <article>
    <h1>Hallo {{ user.name }}</h1>
    <slot></slot>
    <p>
      <router-link :to="'Calculate'" class="btn">zum Ergebnis</router-link>
    </p>
  </article>
</template>

<script>
export default {
  name: 'HelloUser',
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
