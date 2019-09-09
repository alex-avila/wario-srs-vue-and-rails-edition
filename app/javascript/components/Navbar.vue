<template>
  <nav class="header__nav">
    <div class="nav__wrapper utility-wrapper">
      <router-link to="/" class="nav__to-home">
        <div class="nav__logo">WARIO SRS: Vue & Rails Edition</div>
      </router-link>
      <div class="nav__actions">
        <div class="nav__action" @click="$emit('handle-show-modal')">
          <img
            className="add-icon"
            src="../../assets/images/add.svg"
            alt="Add icon."
          />
          NEW
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.header__nav {
  background: rgb(255, 255, 255);
  padding: 1em 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.nav__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__to-home {
  text-decoration: none;
  color: inherit;
}

.nav__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0.618em;
  font-weight: 600;
  letter-spacing: 3px;
}

.nav__actions {
  display: flex;
  border: 1px solid #d8d8d8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 500px;
  padding: 0 0.25em;
}

.nav__action {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  padding: 0.25em 0.5em;
  font-weight: 500;
}

.add-icon {
  display: block;
  height: 25px;
  width: 25px;
  background-size: contain;
  background-position: center;
  margin: 0 0.25em 0 0;
  filter: contrast(0.7);
}
</style>
