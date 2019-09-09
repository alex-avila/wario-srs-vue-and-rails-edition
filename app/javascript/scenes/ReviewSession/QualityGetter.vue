<template>
  <div>
    <div v-if="wasAnswerRevealed" class="quality-getter">
      <Button
        v-for="quality in 5"
        :key="quality"
        @click="$emit('handle-q-res', { len, cardId: id, quality: 1 })"
      >
        {{ quality }}
      </Button>
    </div>
    <div v-else class="quality-getter__reveal" @click="$emit('handle-flip')">
      REVEAL ANSWER
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button";

export default {
  props: {
    wasAnswerRevealed: {
      type: Boolean,
      required: true
    },

    len: {
      type: Number,
      required: true
    }
  },

  components: { Button }
};
</script>

<style>
.quality-getter {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 70px;
}

.quality-getter__reveal {
  border: 1px solid #d8d8d8;
  height: 70px;
  background: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@media (min-width: 600px) {
  .quality-getter,
  .quality-getter__reveal {
    width: 65%;
    margin: 0 auto 2em;
  }

  .quality-getter__reveal {
    box-shadow: 0 6px 6px -4px rgba(0, 0, 0, 0.15);
  }

  .quality-getter {
    grid-gap: 20px;
  }
}
</style>
