<template>
  <base-dialog
    v-if="this.deleteFlag == true"
    :id="this.id"
    @close="cancelDelete"
  ></base-dialog>
  <router-link :to="'/house/' + id">
    <li class="house">
      <div class="house-details">
        <img class="photo" :src="image" alt="street" />
        <div class="info">
          <h3>{{ street }}</h3>
          <div>€ {{ formattedPrice }}</div>
          <div class="zip">{{ zip }} {{ city }}</div>
          <div class="icons">
            <img src="../../assets/ic_bed@3x.png" alt="Bedrooms" />
            {{ bedrooms }}
            <img src="../../assets/ic_bath@3x.png" alt="Bathrooms" />
            {{ bathrooms }}
            <img src="../../assets/ic_size@3x.png" alt="Size" />
            {{ size }} m2
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="modify-buttons" v-if="madeByMe">
          <router-link :to="'/house/edit/' + this.id"
            ><img src="../../assets/ic_edit@3x.png" alt="edit"
          /></router-link>
          <button @click.prevent="this.deleteFlag = true">
            <img src="../../assets/ic_delete@3x.png" alt="delete" />
          </button>
        </div>
        <button class="favorite" @click.prevent="toggleFavorite">
          <img :src="favoriteImgSource" alt="Favorite" />
        </button>
      </div>
    </li>
  </router-link>
</template>

<script>
import BaseDialog from "../nav/BaseDelete.vue";
import favoriteEmpty from "../../assets/ic_star_empty@3x.png";
import favoriteFilled from "../../assets/ic_star_filled@3x.png";

export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      deleteFlag: false,
    };
  },
  props: [
    "id",
    "image",
    "price",
    "bedrooms",
    "bathrooms",
    "garage",
    "size",
    "description",
    "street",
    "city",
    "zip",
    "year",
    "madeByMe",
    "createdAt",
  ],
  methods: {
    cancelDelete() {
      // Cancel the delete action

      this.deleteFlag = false;
    },
    toggleFavorite() {
      this.$store.dispatch("toggleFavorite", this.id);
    },
  },
  computed: {
    formattedPrice() {
      // Format the price value to contain .'s at the correct places.
      const formattedPrice = (+this.price).toLocaleString("nl-NL");
      return formattedPrice;
    },
    favoriteImgSource() {
      return this.isFavorite ? favoriteFilled : favoriteEmpty;
    },
    isFavorite() {
      if (this.$store.getters.favorites) {
        const favorites = this.$store.getters.favorites.slice(0);
        if (favorites.includes(this.id)) {
          return 1;
        }
      }

      return 0;
    },
  },
};
</script>

<style scoped>
.house {
  display: flex;
  justify-content: space-between;
  background-color: var(--ELEMENT-BACKGROUND-2);
  border-radius: var(--DEFAULT-RADIUS);
  margin-bottom: 10px;
  width: 100%;
  overflow-x: auto;
}

/*  The whole item is a link */
a {
  color: inherit;
  text-decoration: inherit;
}

button {
  background-color: transparent;
  cursor: pointer;
}

.house-details {
  display: flex;
  margin: 10px;
  font-size: var(--LISTING-INFORMATION);
}

.photo {
  object-fit: cover;
  height: 90px;
  width: 90px;
  border-radius: var(--DEFAULT-RADIUS);
}

.info {
  padding-left: 15px;
}

.info div,
.info h3 {
  padding-top: 2px;
  padding-bottom: 2px;
}

.info .zip {
  color: var(--ELEMENT-TERTIARY-DARK);
  padding-top: 5px;
  padding-bottom: 8px;
}

.icons img {
  height: 15px;
  padding: 0 8px 0 8px;
}

.icons img:nth-child(1) {
  padding-left: 0;
}

.buttons {
  display: flex;
  align-items: flex-start;
}

.modify-buttons {
  white-space: nowrap;
  padding: 10px 5px 0px 0px;
}
.modify-buttons img,
.favorite img {
  height: 18px;
}

.modify-buttons a,
.modify-buttons button {
  padding: 5px;
}

.favorite {
  padding: 15px 10px 0px 0px;
}
</style>
