<template>
  <div
    v-if="hasFinishedSetup"
    class="deck-details utility-wrapper"
    @click="handleToggleDropdown"
  >
    <div v-if="!!Object.keys(deck).length" class="deck-details__wrapper">
      <TitleBar
        :deck-name="deck.name"
        :is-dropdown-on="isDropdownOn"
        @handle-delete="handleDelete"
      />
      <p>{{ deck.description }}</p>
      <p>{{ cards.length }} cards in total.</p>
      <Dashboard :deck="deck" />
      <router-link
        :to="{
          path: `${this.$route.path}/review-session`,
          params: {
            deckId: this.$route.params.id
          }
        }"
      >
        <Button rounded>STUDY NOW</Button>
      </router-link>
    </div>
  </div>
</template>

<script>
import TitleBar from "./TitleBar";
import Button from "../../components/Button";
import Dashboard from "../../components/Dashboard";
import { mapState } from "vuex";

export default {
  components: {
    TitleBar,
    Button,
    Dashboard
  },

  data: () => ({
    hasFinishedSetup: false,
    isDropdownOn: false,
    wasDeleted: false
  }),

  computed: {
    ...mapState("decks", { deck: state => state.activeDeck }),

    ...mapState("cards", ["cards"])
  },

  async mounted() {
    await this.$store.dispatch("decks/getDeck", this.$route.params.id);
    await this.$store.dispatch("cards/getCards", this.$route.params.id);
    this.hasFinishedSetup = true;
  },

  methods: {
    handleToggleDropdown(e) {
      if (this.isDropdownOn && e.target.id !== "settings__icon") {
        this.isDropdownOn = false;
      } else if (e.target.id === "settings__icon") {
        this.isDropdownOn = !this.isDropdownOn;
      }
    },

    handleDelete() {
      this.$store.dispatch("decks/deleteDeck", {
        id: this.$route.params.id,
        successCallback: () => this.$router.push("/")
      });
    }
  }
};
</script>

<style scoped>
.deck-details__wrapper a {
  display: block;
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
</style>
