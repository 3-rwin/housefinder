<template>
  <base-dialog
    v-if="this.deleteFlag == true"
    :id="this.house.id"
    @close="cancelDelete"
  ></base-dialog>
  <!-- Wait for data to be loaded before showing -->
  <div class="detail" v-if="house">
    <div class="content">
      <header class="desktop">
        <router-link to="/">
          <img class="arrow" src="../assets/ic_back_grey@3x.png" alt="back" />
          <p>Back to overview</p>
        </router-link>
        <img class="photo" :src="this.house.image" alt="" />
      </header>

      <header
        class="mobile"
        :style="{ backgroundImage: 'url(' + house.image + ')' }"
      >
        <div>
          <a @click="$router.back()">
            <img src="../assets/ic_back_white@3x.png" alt="back" />
          </a>
        </div>
        <div class="buttons-mobile">
          <div class="modify-buttons-mobile" v-if="house.madeByMe">
            <router-link :to="'/house/edit/' + this.house.id">
              <img src="../assets/ic_edit_white@3x.png" alt="edit" />
            </router-link>
            <button @click.prevent="this.deleteFlag = true">
              <img src="../assets/ic_delete_white@3x.png" alt="delete" />
            </button>
          </div>
          <button class="favorite" @click.prevent="toggleFavorite">
            <img :src="favoriteImgSource" alt="Favorite" />
          </button>
        </div>
      </header>

      <section class="information">
        <div class="information-split">
          <h2>{{ house.location.street }}</h2>
          <div class="icons">
            <img src="../assets/ic_location@3x.png" alt="location" />
            {{ house.location.zip }} {{ house.location.city }}
          </div>
          <div class="icons">
            <img src="../assets/ic_price@3x.png" alt="Size" />
            {{ formattedPrice }}
            <img src="../assets/ic_size@3x.png" alt="Size" />
            {{ house.size }}
            <img src="../assets/ic_construction_date@3x.png" alt="Size" />
            Built in {{ house.constructionYear }}
          </div>
          <div class="icons">
            <img src="../assets/ic_bed@3x.png" alt="Bedrooms" />
            {{ house.rooms.bedrooms }}
            <img src="../assets/ic_bath@3x.png" alt="Bathrooms" />
            {{ house.rooms.bathrooms }}
            <img src="../assets/ic_garage@3x.png" alt="Bathrooms" />
            {{ house.hasGarage ? "Yes" : "No" }}
          </div>
          <div class="description">
            {{ house.description }}
          </div>
          <div class="buttons-desktop">
            <div class="modify-buttons-desktop" v-if="house.madeByMe">
              <router-link :to="'/house/edit/' + this.house.id">
                <img src="../assets/ic_edit@3x.png" alt="edit" />
              </router-link>
              <button @click.prevent="this.deleteFlag = true">
                <img src="../assets/ic_delete@3x.png" alt="delete" />
              </button>
            </div>
            <button class="favorite" @click.prevent="toggleFavorite">
              <img :src="favoriteImgSource" alt="Favorite" />
            </button>
          </div>
        </div>
      </section>
    </div>
    <section class="recommended">
      <h2>Recommended for you</h2>
      <ul>
        <house-item
          v-for="house in recommendedHouses"
          :key="house.id"
          :id="house.id"
          :image="house.image"
          :price="house.price"
          :bedrooms="house.rooms.bedrooms"
          :bathrooms="house.rooms.bathrooms"
          :garage="house.hasGarage"
          :size="house.size"
          :description="house.description"
          :street="house.location.street"
          :city="house.location.city"
          :zip="house.location.zip"
          :year="house.constructionYear"
          :madeByMe="house.madeByMe"
          :createdAt="house.createdAt"
        ></house-item>
      </ul>
    </section>
  </div>
</template>

<script>
import HouseItem from "@/components/houses/HouseItem.vue";
import BaseDialog from "../components/nav/BaseDelete.vue";
import favoriteEmpty from "../assets/ic_star_empty@3x.png";
import favoriteFilled from "../assets/ic_star_filled@3x.png";

export default {
  components: {
    HouseItem,
    BaseDialog,
  },
  data() {
    return {
      deleteFlag: false,
    };
  },
  methods: {
    cancelDelete() {
      this.deleteFlag = false;
    },
    toggleFavorite() {
      this.$store.dispatch("toggleFavorite", this.house.id);
    },
  },
  computed: {
    house() {
      // Retrieve the information of this house

      const house = this.$store.getters.house(+this.$route.params.id);
      return house;
    },
    recommendedHouses() {
      // Give back a list of recommended houses based on the same amount of bedrooms

      const houses = this.$store.getters.houses.slice(0);
      const recommendedHouses = houses.filter(
        (house) => house.rooms.bedrooms === this.house.rooms.bedrooms
      );

      return recommendedHouses;
    },
    formattedPrice() {
      // Format the price value to contain .'s at the correct places.
      const formattedPrice = (+this.house.price).toLocaleString("nl-NL");
      return formattedPrice;
    },
    favoriteImgSource() {
      return this.isFavorite ? favoriteFilled : favoriteEmpty;
    },
    isFavorite() {
      if (this.$store.getters.favorites) {
        const favorites = this.$store.getters.favorites.slice(0);
        if (favorites.includes(this.house.id)) {
          return 1;
        }
      }

      return 0;
    },
  },
  async mounted() {
    // Collect data from API if that was not done before.
    // For example if user directly went to this page.
    if (!this.$store.getters.houses.length) {
      await this.$store.dispatch("fetchHouses");
    }

    if (!this.$store.getters.favorites.length) {
      this.$store.dispatch("retrieveFavorites");
    }
  },
};
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-y: auto;
}

.desktop {
  display: none;
}

.mobile {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 33vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

.mobile {
  padding: 35px 25px 0 25px;
  vertical-align: top;
}

.mobile img {
  height: 25px;
  padding-left: 10px;
  padding-right: 10px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.information {
  width: 100%;
  padding: 30px;
  margin-top: -30px;
  height: 33vh;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: var(--ELEMENT-BACKGROUND-2);
}

.icons {
  padding-top: 12px;
}

.icons img {
  height: 15px;
  padding: 0 4px 0 18px;
}

.icons img:first-child {
  padding: 0 4px 0 0px;
}

.description {
  padding: 8px 0 0 0;
  text-align: justify;
  text-justify: inter-word;
}

.recommended {
  overflow-y: auto;
  width: 90%;
  height: 33vh;
}

.recommended h2 {
  padding: 20px 0 20px 0;
}

.buttons-desktop,
.buttons-mobile {
  display: flex;
  align-items: flex-start;
}

.buttons-desktop {
  display: none;
}

@media screen and (min-width: 800px) {
  .mobile {
    display: none;
  }

  .desktop {
    display: inline;
    align-items: flex-start;
    padding-top: 20px;
  }

  .desktop a {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    color: var(--TEXT-PRIMARY);
    font-weight: bold;
    font-size: var(--BACK-BUTTON-LABEL);
    padding-bottom: 20px;
  }

  .desktop p {
    text-align: center;
  }

  .desktop .photo {
    width: 100%;
  }

  .desktop .arrow {
    height: 18px;
  }

  .detail {
    align-items: flex-start;
    flex-direction: row;
    gap: 50px;
    width: 90%;
    max-width: 1600px;
  }

  .content {
    align-items: flex-start;
  }

  .information {
    position: relative;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-top: 0px;
  }

  .recommended {
    height: auto;
    flex-basis: 40%;
  }

  .buttons-mobile {
    display: none;
  }

  .buttons-desktop {
    display: flex;
    align-items: center;
    position: absolute;
    white-space: nowrap;
    padding: 10px 5px 0px 0px;
    top: 10px;
    right: 20px;
  }
  .buttons-desktop img {
    height: 18px;
  }

  .modify-buttons-desktop a,
  .buttons-desktop button {
    padding: 3px;
  }
}
</style>
