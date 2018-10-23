<template>
  <div class="home">
    <app-logo></app-logo>
    <HelloUser v-if="user.name" />
    <HelloWorld
      v-else
      headline="Schwanger<wbr>schafts<wbr>woche berechnen">
      <p>Schön das du da bist, hier kannst du deine
        <abbr title='Schwangerschaftswoche'>SSW</abbr> berechnen</p>
    </HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import HelloUser from '@/components/HelloUser.vue';
import AppLogo from '@/components/AppLogo.vue';

export default {
  name: 'home',
  components: {
    AppLogo,
    HelloWorld,
    HelloUser,
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>

<style scoped lang="scss">
  .home {
    display: grid;
    align-content: center;
    justify-content: center;
    text-align: center;

    min-height: 100vh;
    background: var(--color-primary);
    color: var(--color-copy--inverted);
  }
</style>
