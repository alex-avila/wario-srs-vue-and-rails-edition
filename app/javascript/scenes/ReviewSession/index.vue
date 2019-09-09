<template>
  <div v-if="hasFinishedSetup" class="review-session__wrapper">
    <Card
      v-if="activeDeck && card"
      :card="card"
      :is-card-flipped="isCardFlipped"
      @handle-flip="handleFlip"
    />
    <div v-if="card" class="review__status-and-controls">
      <ReviewProgress
        class="progresss"
        :percentage="(currentCardsNum / initialCardsNum) * 100"
      />
      <QualityGetter
        :len="this.cardsAvailableNow.length"
        :card-id="card.id"
        :was-answer-revealed="wasAnswerRevealed"
        @handle-q-res="handleQualityResponse"
        @handle-flip="handleFlip"
      />
    </div>
    <div v-else class="utility-wrapper">
      <h1>Finished review.</h1>
    </div>
  </div>
</template>

<script>
import QualityGetter from "./QualityGetter";
import Card from "./Card";
import ReviewProgress from "./ReviewProgress";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    QualityGetter,
    Card,
    ReviewProgress
  },

  data: () => ({
    hasFinishedSetup: false,
    currentIndex: 0,
    isCardFlipped: false,
    wasAnswerRevealed: false,
    initialCardsNum: 0, // This will be used to get percentage
    currentCardsNum: 0 // This will be used to get percentage
  }),

  computed: {
    ...mapState("decks", ["activeDeck"]),

    ...mapState("cards", ["cards"]),

    ...mapGetters("cards", ["cardsAvailableNow"]),

    card() {
      return this.cardsAvailableNow[this.currentIndex];
    }
  },

  async mounted() {
    if (Object.keys(this.activeDeck).length) {
      this.initialCardsNum = this.cardsAvailableNow.length;
    } else {
      await this.$store.dispatch("decks/getDeck", this.$route.params.id);
      await this.$store.dispatch("cards/getCards", this.$route.params.id);
    }

    this.hasFinishedSetup = true;
  },

  methods: {
    handleQualityResponse({ len, cardId, quality }) {
      // Handles what happens when a certain quality is given so that it does not break
      const deckId = this.$route.params.id;

      this.$store.dispatch("cards/updateCard", {
        deckId,
        card: this.card,
        quality
      });

      if (quality > 3) {
        this.currentCardsNum = this.currentCardsNum + 1;
        if (this.currentIndex + 1 >= len - 1) {
          this.currentIndex = 0;
        }
        this.isCardFlipped = false;
        this.wasAnswerRevealed = false;
      } else {
        if (this.currentIndex + 1 <= len - 1) {
          this.currentIndex += 1;
          this.isCardFlipped = false;
          this.wasAnswerRevealed = false;
        } else {
          this.currentIndex = 0;
          this.isCardFlipped = false;
          this.wasAnswerRevealed = false;
        }
      }
    },

    handleFlip() {
      this.isCardFlipped = !this.isCardFlipped;
      this.wasAnswerRevealed = true;
    }
  }
};
</script>

<style scoped>
.review-session__wrapper {
  height: calc(100% - 160px);
}

.review__status-and-controls {
  position: absolute;
  width: 100%;
  bottom: 0;
}

@media (min-width: 600px) {
  .review-session__wrapper {
    height: auto;
    width: calc(100% - 3em);
    max-width: 800px;
    margin: 3em auto 0;
    background: #fff;
    border: 1px solid #d8d8d8;
    box-shadow: 0 20px 30px -20px rgba(0, 0, 0, 0.13);
    position: relative;
    z-index: 0;
  }
  .review__status-and-controls {
    position: static;
  }
  .review-session__wrapper h1 {
    text-align: center;
  }
}
</style>
