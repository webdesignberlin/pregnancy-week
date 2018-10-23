<template>
  <header class="app-header">
    <router-link to="/" class="app-header__back" v-if="step === 1">
      <span class="sr-only">Back to Home</span>
    </router-link>
    <button v-else class="app-header__back" @click.prevent="$parent.stepPrev()">
      <span class="sr-only">Back to last Step</span>
    </button>
    <h1 class="app-header__headline">Step {{ step }}/{{ stepMax}}</h1>
    <svg viewBox="0 104 375 152" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0v139.26c73.144 19.536 148.31 16.604
        225.496-8.798 77.186-25.401 127.02-31.796 149.504-19.184V0H0z"
        fill="#30015F"
        fill-rule="evenodd"/>
    </svg>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    step: Number,
    stepMax: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .app-header__back {
    grid-area: back;
    background: url('../assets/icon-back.svg') 50% no-repeat;
    padding: 2rem;
  }

  .app-header__headline {
    font: inherit;
    grid-area: headline;
  }

  .app-header {
    --app-header-background: var(--color-primary, #30015F);

    grid-area: header;

    display: grid;
    grid: [header1-start] "back headline ." 110px [header1-end] [bottom-start]
          "bottom bottom bottom" [bottom-end]
          / minmax(20px, 4rem) auto minmax(20px, 4rem);
    align-items: center;

    height: 110px;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    background: var(--app-header-background);
    z-index: 20;
    /* clip-path: polygon(100% 65%, 100% 0%, 0% 0%, 0% 87%, 3%
    91%, 7% 95%, 12% 98%, 17% 100%, 22% 99%, 28% 97%, 36% 94%,
    43% 93%, 53% 87%, 61% 80%, 70% 71%, 78% 64%, 85% 60%, 92% 58%); */
  }

  svg {
    align-self: baseline;
    grid-area: bottom;
    width: 100%;

    path {
      fill: var(--app-header-background);
    }
  }
</style>
