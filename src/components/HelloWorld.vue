<template>
  <article>
    <h1>{{ headline }}</h1>
    <p v-html="msg"></p>
    <p>
      <router-link :to="'Calculate'" class="btn">Jetzt SSW berechnen</router-link>
    </p>
  </article>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    headline: String,
    msg: String,
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
