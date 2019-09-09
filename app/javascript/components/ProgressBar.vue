<template>
  <div class="progress-bar">
    <div class="progress-bar__wrapper">
      <div
        :style="{
          width: `${!isNaN(percentage) ? percentage : 0}%`,
          height: '100%'
        }"
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
.progress-bar__wrapper {
  border-bottom: 0;
  height: 10px;
  border: 1px solid #d8d8d8;
}

.progress-bar__wrapper {
  width: 100%;
  background: repeating-linear-gradient(
    -33deg,
    #fff,
    #fff 4px,
    #ebebeb 4px,
    #ebebeb 5px
  );
}

.progress-bar__progression {
  background: #333;
  transition: all 0.25s;
}
</style>