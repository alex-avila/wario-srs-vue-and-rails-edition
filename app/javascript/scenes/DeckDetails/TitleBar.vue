<template>
  <div class="name-wrapper">
    <div class="name-wrapper--inner">
      <h2>{{ deckName }}</h2>
      <div class="deck__settings">
        <div
          :class="
            isDropdownOn
              ? 'settings__dropdown dropdown-show'
              : 'settings__dropdown'
          "
        >
          <span @click="$emit('handle-delete')">Delete</span>
        </div>
        <img
          class="settings__icon"
          id="settings__icon"
          src="../../../assets/images/settings.svg"
          alt="Settings"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deckName: {
      type: String,
      required: true
    },

    isDropdownOn: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
.name-wrapper--inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name-wrapper--inner h2 {
  margin: 1em 0;
}

.name-wrapper::after {
  content: "";
  display: block;
  background: #333;
  height: 2px;
  margin-top: -5px;
  width: 100%;
}

.deck__settings {
  position: relative;
  display: flex;
  flex-direction: column;
}

.settings__icon {
  align-self: center;
  display: block;
  height: 25px;
  width: 25px;
  background-size: contain;
  background-position: center;
  margin: 0 0.25em 0 0;
  filter: contrast(0.7);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.23, 0, 0.51, 0.98);
}

.settings__dropdown {
  background: #ffffff;
  margin: 0.25em 0 0;
  padding: 1em 0;
  border: 1px solid #d8d8d8;
  position: absolute;
  top: 25px;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.1s;
}

.dropdown-show {
  visibility: visible;
  opacity: 1;
}

.dropdown-show + .settings__icon {
  transform: rotate(120deg);
}

.settings__dropdown span {
  cursor: pointer;
  padding: 0 1em;
}
</style>