<template>
  <div class="review-progress-bar">
    <div class="progress-bar__wrapper">
      <div
        :style="{ width: `${percentage}%`, height: '100%' }"
        class="progress-bar__progression"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
@media (min-width: 600px) {
  .review-progress-bar .progress-bar__wrapper {
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
    border: none;
    border-bottom: 1px solid #d8d8d8;
  }
}
</style>
