<template>
  <div class="home">
    <HelloWorld
      headline="Schwangerschaftswoche berechnen"
      msg="Schön das du da bist, hier kannst du deine
      <abbr title='Schwangerschaftswoche'>SSW</abbr> berechnen" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped lang="scss">
  .home {
    display: grid;
    align-content: center;
    justify-content: center;

    min-height: 100vh;
    background: rgb(255,174,138);
    background: linear-gradient(135deg, rgba(255,174,138,1) 0%,rgba(255,191,184,1) 100%);
  }
</style>
