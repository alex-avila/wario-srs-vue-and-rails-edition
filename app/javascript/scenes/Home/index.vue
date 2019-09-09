<template>
  <section class="decks-list">
    <h2 class="utility-wrapper">Decks</h2>
    <div class="decks-list__wrapper utility-wrapper">
      <Deck v-for="deck in decks" :key="deck.id" :deck="deck" />
    </div>
  </section>
</template>

<script>
import Deck from "./Deck";
import { mapState } from "vuex";

export default {
  components: { Deck },

  computed: {
    ...mapState("decks", ["decks"])
  },

  mounted() {
    this.$store.dispatch("decks/getDecks");
  }
};
</script>

<style>
.decks-list {
  padding-bottom: 2em;
}

.decks-list h2 {
  margin: 0.5em auto;
}

.decks-list__wrapper {
  display: grid;
  grid-gap: 1em;
}

@media (min-width: 600px) {
  .decks-list__wrapper {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
