<template>
  <button
    @click="callback($event)"
    :class="type"
    :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiBtn',
  props: {
    type: String,
    disabled: Boolean,
  },
  methods: {
    callback(e) {
      const vm = this;
      vm.$emit('click', e);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  --button-radius: 25px;
  --button-background: var(--color-primary, #7BA9E8);
  --button-background--disabled: #E6E6E6;
  --button-color: #fff;
  --button-color--disabled: #9B9B9B;

  display: block;
  width: 100%;
  background: var(--button-background);
  padding: 14px;
  text-align: center;
  min-height: 50px;
  border-radius: var(--button-radius);
  font-size: 18px;
  color: var(--button-color);
  text-decoration: none;

  &.inverted {
    background: var(--button-color);
    color: var(--button-background);
  }

  &:disabled {
    background: var(--button-background--disabled);
    color: var(--button-color--disabled);
  }
}
</style>
