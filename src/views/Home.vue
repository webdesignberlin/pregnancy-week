<template>
  <div class="home">
    <HelloUser v-if="user.name" />
    <HelloWorld
      v-else
      headline="Schwangerschaftswoche berechnen">
      <p>Schön das du da bist, hier kannst du deine
        <abbr title='Schwangerschaftswoche'>SSW</abbr> berechnen</p>
    </HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import HelloUser from '@/components/HelloUser.vue';

export default {
  name: 'home',
  components: {
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

    min-height: 100vh;
    background: rgb(255,174,138);
    background: linear-gradient(135deg, rgba(255,174,138,1) 0%,rgba(255,191,184,1) 100%);
  }
</style>
