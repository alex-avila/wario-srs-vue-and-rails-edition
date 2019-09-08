<template>
  <router-link :to="`/decks/${deck.id}`" class="deck-item">
    <div class="deck-item__wrapper">
      <div :id="deck.id">
        <h3>{{ deck.name }}</h3>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    deck: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.deck-item {
  display: block;
  border: 1px solid #d8d8d8;
  background: #fff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.13);
  border-radius: 3px 3px 0 0;
}

.deck-item__wrapper {
  text-align: center;
}

.deck-item__wrapper h3 {
  font-weight: 500;
}
</style>