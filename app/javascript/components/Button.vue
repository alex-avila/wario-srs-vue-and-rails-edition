<template>
  <button
    v-on="$listeners"
    class="utility-btn"
    :style="rounded ? { borderRadius: 100 } : null"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.utility-btn {
  /* border: 1px solid #979797; */
  background: #fff;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  padding: 0.618em 1em;
  border: 1px solid #d8d8d8;
  color: #111;
  cursor: pointer;
  box-shadow: 0 2px 4px #0000001f;
}
</style>