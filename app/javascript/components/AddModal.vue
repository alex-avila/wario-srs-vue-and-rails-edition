<template>
  <div
    id="background"
    :class="modalClasses"
    @click="$emit('handle-hide-modal', $event)"
  >
    <div class="add-deck-modal__wrapper">
      <input
        v-model="inputs.valOne"
        type="text"
        :placeholder="isNewDeck ? 'Name' : 'Question'"
        autocomplete="off"
      />
      <textarea
        v-if="isNewDeck"
        v-model="inputs.valTwo"
        type="text"
        placeholder="Describe this deck…"
        autocomplete="off"
      />
      <input
        v-else
        v-model="inputs.valTwo"
        type="text"
        placeholder="Answer"
        autocomplete="off"
      />
      <Button rounded @click="handleAdd">
        ADD {{ isNewDeck ? "DECK" : "CARD" }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
// import { addDeck, addCard } from "../../redux/decksReducer";

export default {
  components: { Button },

  props: {
    isNewDeck: {
      type: Boolean,
      default: false
    },

    isModalOn: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    inputs: {
      valOne: "",
      valTwo: ""
    }
  }),

  computed: {
    modalClasses() {
      let modalClasses = "add-deck-modal";

      if (this.isModalOn) {
        modalClasses += " modal__show";
      }

      return modalClasses;
    }
  },

  methods: {
    handleAdd() {
      // if isNewDeck we're in ADD DECK mode else we're in ADD CARD mode
      const { valOne, valTwo } = this.inputs;
      if (this.isNewDeck) {
        const body = {
          name: valOne,
          description: valTwo
        };
        this.$store.dispatch("decks/addDeck", body);
        this.$emit("handle-hide-modal");
      } else {
        const deckId = this.$route.params.id;
        this.$store.dispatch("cards/createCard", {
          deckId,
          body: { front: valOne, back: valTwo }
        });
      }

      this.inputs = {
        valOne: "",
        valTwo: ""
      };
    },

    handleChange() {
      const { name, value } = e.target;

      this.inputs = {
        ...this.inputs,
        [name]: value
      };
    }
  }
};
</script>

<style scoped>
.add-deck-modal {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

.add-deck-modal__wrapper {
  background: #fafafa;
  border-radius: 3px;
  border: 1px solid #d8d8d8;
  padding: 1em 1em;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
}

.add-deck-modal input,
.add-deck-modal textarea {
  border-radius: 3px;
  background: #ffffff;
  font-size: 16px;
  border: 1px solid #d8d8d8;
  padding: 0.5rem 0.618rem;
  margin: 0 0 0.5em;
  color: inherit;
  outline: none;
}

.add-deck-modal input::placeholder,
.add-deck-modal textarea::placeholder {
  color: #aaaaaa;
}

.add-deck-modal input {
  font-size: 22px;
}

.add-deck-modal textarea {
  resize: none;
  height: 100px;
  margin: auto 0 0.618em;
}

.add-deck-modal button {
  width: 63%;
  margin: auto;
}

.modal__show {
  visibility: visible;
  opacity: 1;
}
</style>
