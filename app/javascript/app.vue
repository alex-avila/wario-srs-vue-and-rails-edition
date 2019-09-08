<template>
  <div id="app">
    <Navbar @handle-show-modal="isAddModalOn = true" />
    <AddModal
      :is-modal-on="isAddModalOn"
      :is-new-deck="$route.path === '/dashboard'"
      @handle-hide-modal="handleHideModal"
    />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import AddModal from "./components/AddModal";

export default {
  components: { Navbar, AddModal },

  data: () => ({
    isAddModalOn: false
  }),

  methods: {
    handleHideModal(e) {
      if (!e || e.target.id === "background") {
        this.isAddModalOn = false;
      }
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#root,
.wrapper {
  margin: 0;
  font-family: "Helvetica Neue";
  color: #111;
  height: 100%;
  line-height: 1.618;
  background: #f0f0f0;
}

.utility-wrapper {
  padding: 0 1rem;
  max-width: 800px;
  margin: auto;
}
</style>
