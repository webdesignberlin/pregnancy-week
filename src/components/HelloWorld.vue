<template>
  <article>
    <h1 v-html="headline"></h1>
    <slot></slot>
    <p>
      <router-link :to="'Calculate'" tag="div">
        <ui-btn type="inverted">Jetzt SSW berechnen</ui-btn>
      </router-link>
    </p>
  </article>
</template>

<script>
import UiBtn from './ui/button.vue';

export default {
  name: 'HelloWorld',
  components: { UiBtn },
  props: {
    headline: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1 {
    font-size: 2.5rem; // 40px
  }

  article {
    padding: 2rem;
  }

  p {
    margin-top: 20px;
    margin-bottom: 50px;
  }
</style>
