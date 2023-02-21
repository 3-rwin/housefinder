<template>
  <!-- Teleport the popup to body so it is in front of the page for sure -->
  <teleport to="body">
    <div class="background" @click="$emit('close')"></div>
    <dialog open>
      <header>
        <h1>Delete Listing</h1>
      </header>
      <p>
        Are you sure tou want to delete this listing? <br />
        This action cannot be undone.
      </p>
      <menu>
        <button class="delete-button" @click="deleteHouse()">
          YES, DELETE
        </button>
        <button class="cancel-button" @click="$emit('close')">GO BACK</button>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
import router from "@/router";

export default {
  props: ["id"],
  emits: ["close"],
  methods: {
    async deleteHouse() {
      // Delete the house that contains the id as passed down in the prop id.
      await this.$store
        .dispatch("deleteHouse", this.id.toString())
        .catch((error) => console.log("error", error));

      // Also delete the id from the favorites if it is there
      this.$store.dispatch("deleteFavorite", this.id);

      // After deleting, close the popup, fetch the up to date data and navigate to the home screen.
      this.$emit("close");
      this.$store.dispatch("fetchHouses");
      router.push("/");
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 30vh;
  left: 5%;
  width: 90%;
  z-index: 100;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

header h1 {
  text-align: center;
  padding: 20px;
}

p {
  padding: 10px 20px 10px 20px;
  text-align: center;
}

menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

menu button {
  padding: 10px;
  width: 50%;
  border-radius: var(--DEFAULT-RADIUS);
  margin: 10px;
  color: white;
}

menu .delete-button {
  background-color: var(--ELEMENT-PRIMARY);
}
menu .cancel-button {
  background-color: var(--ELEMENT-SECONDARY);
}

@media screen and (min-width: 800px) {
  dialog {
    width: 60%;
    left: 20%;
  }
}
</style>
