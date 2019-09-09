<template>
  <div class="card__wrapper">
    <div
      :class="isCardFlipped ? 'card flipped' : 'card'"
      @click="$emit('handle-flip')"
    >
      <div class="card__side card__back">
        <p :style="isNewCard ? { animation: 'fadeIn 0.5s ease-in' } : null">
          {{ card.front }}
        </p>
      </div>
      <div class="card__side card__front">
        <p :style="isNewCard ? { animation: 'fadeIn 0.5s ease-in' } : null">
          {{ card.back }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    },

    isCardFlipped: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    isNewCard: false,
    prevFront: ""
  }),

  mounted() {
    if (this.card.front !== this.prevFront) {
      this.isNewCard = true;
    } else {
      this.isNewCard = false;
    }

    this.prevFront = this.card.front;
  }
};
</script>

<style>
.card__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.card {
  cursor: pointer;
  transform-style: preserve-3d;
  position: relative;
  margin: auto;
  height: 300px;
  width: calc(300px / 1.214);
  font-size: 22px;
  transition: all 0.5s cubic-bezier(0.02, 0.49, 0.54, 0.98);
}

.card__side {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 0.75em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid #d8d8d8;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.card__front {
  transform: rotateY(180deg);
}

.card__back {
  transform: rotateY(0deg);
}

.flipped {
  transform: rotateY(180deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (min-width: 600px) {
  .card__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 100%; */
    padding: 3em 0;
  }
}
</style>