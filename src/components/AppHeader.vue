<template>
    <header class="app-header">
        <router-link to="/" class="app-header__back"><span class="sr-only">Back</span></router-link>
        <h1 class="app-header__headline">Step 1/2</h1>
    </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .app-header__back {
        display: inline-block;
        width: 12px;
        height: 21px;
        background: url('../assets/icon-back.svg') 50% no-repeat;
        padding: 12px;
    }
    .app-header__headline {
        font: inherit;
        flex: 1 0 auto;
    }
    .app-header {
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
        font-weight: 700;
        color: #fff;
        background: url('../assets/header.svg') center bottom repeat-x;
        background-size: cover;
        height: 110px;
        /*clip-path: polygon(100% 65%, 100% 0%, 0% 0%, 0% 87%, 3%
        91%, 7% 95%, 12% 98%, 17% 100%, 22% 99%, 28% 97%, 36% 94%,
        43% 93%, 53% 87%, 61% 80%, 70% 71%, 78% 64%, 85% 60%, 92% 58%);*/
    }
</style>
