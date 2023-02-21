<template>
  <div class="house-overview">
    <header>
      <h1>Houses</h1>
      <div class="create-button">
        <router-link to="/house/create">
          <img
            class="mobile"
            src="../assets/ic_plus_grey@3x.png"
            alt="Add House"
          />
          <button class="desktop">
            <img src="../assets/ic_plus_white@3x.png" alt="Add House" />
            CREATE NEW
          </button>
        </router-link>
      </div>
    </header>
    <div class="options">
      <div class="search-field">
        <label for="house">
          <img src="../assets/ic_search@3x.png" alt="Search House" />
        </label>
        <input
          type="text"
          id="house"
          name="house"
          placeholder="Search for a house"
          v-model="search"
        />
        <button v-if="search" @click="clearSearch">
          <img src="../assets/ic_clear@3x.png" alt="Clear Search" />
        </button>
      </div>
      <div class="order-buttons">
        <button
          class="prize"
          :class="wayOfSorting === 'price' && 'active'"
          @click="setWayOfSorting('price')"
        >
          Price
        </button>
        <button
          class="size"
          :class="wayOfSorting === 'size' && 'active'"
          @click="setWayOfSorting('size')"
        >
          Size
        </button>
        <button class="favorite" @click.prevent="toggleFavoriteFilter">
          <img :src="favoriteImgSource" alt="Favorite" />
        </button>
      </div>
    </div>
    <div class="results-counter" v-if="search && houses.length">
      <h2>{{ houses.length }} results found</h2>
    </div>
    <div class="no-results" v-if="search && !houses.length">
      <img src="../assets/img_empty_houses@3x.png" alt="Search House" />
      No results found. <br />
      Please try another keyword.
    </div>
    <div class="house-list">
      <ul>
        <house-item
          v-for="house in houses"
          :key="house.id"
          :id="house.id"
          :image="house.image"
          :price="house.price"
          :bedrooms="house.rooms.bedrooms"
          :bathrooms="house.rooms.bathrooms"
          :garage="house.hasGarage"
          :size="house.size"
          :description="house.rooms.description"
          :street="house.location.street"
          :city="house.location.city"
          :zip="house.location.zip"
          :year="house.constructionYear"
          :madeByMe="house.madeByMe"
          :createdAt="house.createdAt"
        ></house-item>
      </ul>
    </div>
  </div>
</template>

<script>
import HouseItem from "@/components/houses/HouseItem.vue";
import favoriteEmpty from "../assets/ic_star_empty@3x.png";
import favoriteFilled from "../assets/ic_star_filled@3x.png";

export default {
  data() {
    return {
      favoriteHouses: false,
      wayOfSorting: "price",
      orderOfSorting: 0,
      search: "",
    };
  },
  components: {
    HouseItem,
  },
  computed: {
    favoriteImgSource() {
      return this.favoriteHouses ? favoriteFilled : favoriteEmpty;
    },

    houses() {
      // use slice() to copy the array and not just make a reference
      // Get all the houses from teh backend.
      let houses = this.$store.getters.houses.slice(0);

      // Sort the houses based on what way of sorting is set.
      // If the button is pressed a second time the order of sorting is inverted.
      houses.sort((a, b) => {
        if (this.wayOfSorting === "price") {
          if (this.orderOfSorting) {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        } else if (this.wayOfSorting === "size") {
          if (this.orderOfSorting) {
            return a.size - b.size;
          } else {
            return b.size - a.size;
          }
        }
      });

      if (this.favoriteHouses) {
        houses = houses.filter((house) =>
          this.$store.getters.favorites.includes(house.id)
        );
      }

      // Use search input to filter houses based on streetname, zip, city, price or size
      if (this.search) {
        const filteredHouses = houses.filter(
          (house) =>
            house.location.street
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            house.location.city
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            house.location.zip
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            house.size.toString().includes(this.search.toLowerCase()) ||
            house.price.toString().includes(this.search.toLowerCase())
        );

        return filteredHouses;
      }

      return houses;
    },
  },
  methods: {
    toggleFavoriteFilter() {
      this.favoriteHouses = !this.favoriteHouses;
    },
    clearSearch() {
      // Clear the search bar when the X button is pressed

      this.search = "";
    },
    setWayOfSorting(way) {
      // Set way of sorting either by price or by size or reverse the sorting

      if (this.wayOfSorting === way) {
        // If the pressed button is already the way of sorting, reverse the order.

        this.orderOfSorting = !this.orderOfSorting;
      } else {
        this.wayOfSorting = way;
      }
    },
  },
  mounted() {
    // On opening this page, retrieve all houses data from the backend.

    this.$store.dispatch("fetchHouses");
    this.$store.dispatch("retrieveFavorites");
  },
};
</script>

<style scoped>
.house-overview {
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: var(--ELEMENT-BACKGROUND-1);
  overflow-y: auto;
}

header {
  display: flex;
  padding: 10px 0 10px 0;
  justify-content: space-between;
}

header::before,
h1,
.create-button {
  content: "";
  flex-basis: 100%;
}

h1 {
  text-align: center;
  margin: auto;
}

.create-button {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

.create-button img {
  height: 18px;
}

.create-button .desktop {
  background-color: var(--ELEMENT-PRIMARY);
  color: white;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-items: center;
  display: none;
  padding: 10px 30px 10px 30px;
  border-radius: var(--DEFAULT-RADIUS);
}

.search-field {
  display: flex;
  align-items: center;
  background-color: var(--ELEMENT-TERTIARY-LIGHT);
  padding: 5px;
  border-radius: var(--DEFAULT-RADIUS);
  flex-grow: 1;
}

.search-field img {
  height: 18px;
  padding-left: 10px;
  padding-right: 10px;
}

.search-field input {
  flex-grow: 1;
  height: 32px;
  border: none;
  outline: none;
  background-color: var(--ELEMENT-TERTIARY-LIGHT);
}

.order-buttons {
  display: flex;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}

.order-buttons .prize,
.order-buttons .size {
  display: flex;
  flex-grow: 1;
  padding: 12px;
  align-items: center;
  justify-content: center;
  background-color: var(--ELEMENT-TERTIARY-DARK);
  color: white;
  border-bottom-left-radius: var(--DEFAULT-RADIUS);
  border-top-left-radius: var(--DEFAULT-RADIUS);
  font-size: var(--BUTTONS);
}

.order-buttons button:nth-child(2) {
  border-radius: 0;
  border-bottom-right-radius: var(--DEFAULT-RADIUS);
  border-top-right-radius: var(--DEFAULT-RADIUS);
}

.order-buttons .active {
  background-color: var(--ELEMENT-PRIMARY);
}

.favorite img {
  height: 25px;
  padding: 0px 00px 0px 15px;
}

.results-counter {
  padding-bottom: 15px;
}

.no-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 60vh;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.no-results img {
  width: 90%;
  max-width: 400px;
}

.house-list {
  overflow-y: auto;
}

@media screen and (min-width: 800px) {
  header::before {
    display: none;
  }

  header h1 {
    text-align: left;
  }

  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .search-field {
    flex-grow: 0;
    width: 300px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .order-buttons {
    width: 300px;
  }

  .house-overview {
    width: 90%;
    max-width: 1600px;
    overflow-y: visible;
  }

  .create-button .mobile {
    display: none;
  }

  .create-button .desktop {
    display: flex;
  }
}
</style>
