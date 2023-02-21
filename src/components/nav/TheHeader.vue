<template>
  <header>
    <div class="content">
      <router-link :class="this.page !== '/about' ? 'active' : null" to="/"> Houses </router-link>
      <router-link :class="this.page === '/about' ? 'active' : null" to="/about"> About </router-link>
    </div>
  </header>
</template>

<script>
export default {
  props: ["page"],
};
</script>

<style scoped>
header {
  display: flex;

  justify-content: center;
  width: 100%;
  background-color: var(--ELEMENT-BACKGROUND-2);
  padding: 20px 0 20px 0;
  z-index: 1;
}

.content {
  display: flex;
  gap: 50px;
  align-items: center;
  justify-items: center;
  width: 90%;
  max-width: 1600px;
}

img {
  height: 50px;
}

a {
  font-size: var(--ACTIVE-MENU-HEADER);
  color: var(--TEXT-PRIMARY);
}

.active {
  font-weight: bold;
}

@media screen and (max-width: 800px) {
  header {
    display: none;
  }
}
</style>
