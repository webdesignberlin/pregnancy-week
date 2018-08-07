<template>
  <article>
    <h1>Hallo {{ user.name }}</h1>
    <p v-html="msg"></p>
    <p>
      <router-link :to="'Calculate'" class="btn">zum Ergebnis</router-link>
    </p>
  </article>
</template>

<script>
export default {
  name: 'HelloUser',
  props: {
    msg: String,
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
