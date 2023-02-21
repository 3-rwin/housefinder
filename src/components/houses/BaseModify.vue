<template>
  <div class="mobile-background"></div>
  <div class="wrapper">
    <div class="listing">
      <div class="listing-content">
        <header>
          <a @click="$router.back()">
            <img src="../../assets/ic_back_grey@3x.png" alt="back" />
            <p class="desktop">Back to overview</p>
          </a>
          <slot name="header"></slot>
        </header>
        <form @submit.prevent="submitForm">
          <div>
            <label for="street">Street name*</label>
            <input
              :class="showInvalidInput && !form.streetName ? 'invalid' : null"
              id="street"
              name="street"
              type="text"
              v-model="form.streetName"
              placeholder="Enter the street name"
            />
          </div>
          <div class="half-screen">
            <div class="half-screen-part">
              <label for="number">House Number*</label>
              <input
                :class="
                  showInvalidInput && !form.houseNumber ? 'invalid' : null
                "
                id="number"
                name="number"
                type="number"
                v-model="form.houseNumber"
                placeholder="Enter house number"
              />
            </div>
            <div class="half-screen-part">
              <label for="addition">Addition (optional)</label>
              <input
                id="addition"
                name="addition"
                type="text"
                v-model="form.numberAddition"
                placeholder="e.g. A"
              />
            </div>
          </div>
          <div>
            <label for="postalCode">Postal code*</label>
            <input
              :class="showInvalidInput && !form.zip ? 'invalid' : null"
              id="postalCode"
              name="postalCode"
              type="text"
              v-model="form.zip"
              placeholder="e.g. 1000AA"
            />
          </div>
          <div class="">
            <label for="city">City*</label>
            <input
              :class="showInvalidInput && !form.city ? 'invalid' : null"
              id="city"
              name="city"
              type="text"
              v-model="form.city"
              placeholder="e.g. Utrecht"
            />
          </div>
          <div class="upload">
            <label for="picture">Upload picture (PNG or JPG)*</label>
            <label htmlFor="file" class="file">
              <img
                v-if="!file && !fileUrl"
                class="image"
                :class="showInvalidInput && !fileUrl ? 'invalid' : null"
                src="../../assets/ic_upload@3x.png"
                alt="add button"
              />
              <div v-else>
                <img
                  class="image"
                  :src="fileUrl"
                  style="padding: 0"
                  alt="add button"
                />
                <img
                  class="clear-upload"
                  src="../../assets/ic_clear_white@3x.png"
                  alt="Clear upload"
                  @click.prevent="clearUpload()"
                />
              </div>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              ref="file"
              accept=".jpg, .jpeg, .png"
              @change="onChangeFileUpload()"
            />
          </div>
          <div class="">
            <label for="price">Price*</label>
            <input
              :class="showInvalidInput && !form.price ? 'invalid' : null"
              id="price"
              name="price"
              type="number"
              v-model="form.price"
              placeholder="e.g. €150.000"
            />
          </div>
          <div class="half-screen">
            <div class="half-screen-part">
              <label for="size">Size*</label>
              <input
                :class="showInvalidInput && !form.size ? 'invalid' : null"
                id="size"
                name="size"
                type="number"
                v-model="form.size"
                placeholder="e.g. 60m2"
              />
            </div>
            <div class="half-screen-part">
              <label for="garage">Garage*</label>
              <select
                :class="showInvalidInput && !form.hasGarage ? 'invalid' : null"
                id="garage"
                name="garage"
                v-model="form.hasGarage"
                placeholder="Select"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div class="half-screen">
            <div class="half-screen-part">
              <label for="bedrooms">Bedrooms*</label>
              <input
                :class="showInvalidInput && !form.bedrooms ? 'invalid' : null"
                id="bedrooms"
                name="bedrooms"
                type="number"
                v-model="form.bedrooms"
                placeholder="Enter amount"
              />
            </div>
            <div class="half-screen-part">
              <label for="bathrooms">Bathrooms*</label>
              <input
                :class="showInvalidInput && !form.bathrooms ? 'invalid' : null"
                id="bathrooms"
                name="bathrooms"
                type="number"
                v-model="form.bathrooms"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div>
            <label for="constructionYear">Construction date*</label>
            <input
              :class="
                (showInvalidInput && !form.constructionYear) ||
                showInvalidConstructionYear
                  ? 'invalid'
                  : null
              "
              id="constructionYear"
              name="constructionYear"
              type="number"
              v-model="form.constructionYear"
              placeholder="e.g. 1990"
            />
          </div>
          <div class="">
            <label for="description">Description*</label>
            <textarea
              :class="showInvalidInput && !form.description ? 'invalid' : null"
              id="description"
              name="description"
              type="text"
              v-model="form.description"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div class="error-message">
            <p :class="!showInvalidInput ? 'not-active' : null">
              Required field missing. {{ invalidConstructionYearText }}
            </p>
          </div>
          <div class="button-part">
            <button :class="invalidInput ? 'transparant' : null">
              <slot name="button">SAVE</slot>
            </button>
          </div>
        </form>
      </div>
      <div class="filler"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInvalidInput: false,
      showInvalidConstructionYear: false,
      invalidConstructionYearText: "",
      image: null,
      file: "",
      fileUrl: null,
      form: {
        price: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        streetName: "",
        houseNumber: "",
        numberAddition: "",
        zip: "",
        city: "",
        constructionYear: "",
        hasGarage: "",
        description: "",
      },
    };
  },
  computed: {
    invalidInput() {
      // Check if any value in the form equals '' except for numberAddition
      // and check if no file is uploaded.
      // If so, alert on the page and do not upload data.

      for (const [key, value] of Object.entries(this.form)) {
        if (key !== "numberAddition" && value === "") {
          return true;
        }
      }

      if (!this.fileUrl) {
        return true;
      }

      // If nothing returns empty, te input is valid and we may proceed with sending it to the backend.
      return false;
    },
    invalidConstructionYear() {
      if (
        this.form.constructionYear < 1901 ||
        this.form.constructionYear > 2155
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async submitForm() {
      // If the user inputed valid data and a valid image, post the data and image to the backend.
      // Ths can be either on a newly created item or editing an existing item.

      if (this.invalidConstructionYear) {
        this.showInvalidConstructionYear = true;
        this.invalidConstructionYearText =
          "Construction Year must be between 1901 and 2155.";
        this.showInvalidInput = true;
        return;
      } else {
        this.showInvalidConstructionYear = false;
        this.invalidConstructionYearText = "";
      }

      if (this.invalidInput) {
        this.showInvalidInput = true;
        return;
      }

      const apiLink = this.$route.params.id ?? "";

      // Gather the needed data and send it to the API using the action addModifyHouse
      const payload = { data: this.form, apiLink: apiLink };
      const newHouse = await this.$store
        .dispatch("addModifyHouse", payload)
        .catch((error) => console.log("error", error));

      await this.uploadImage(newHouse.data.id);

      // After creating or editing, reload the data from the API so we know we have the latest data.
      this.$store.dispatch("fetchHouses");
      // Navigate to newly created or edited item
      this.$router.push({
        path: "/house/" + (this.$route.params.id ?? newHouse.data.id),
      });
    },

    async uploadImage(houseId) {
      // Upload the image of the house

      let data = new FormData();
      data.append("image", this.file);

      const imageApiLink = (this.$route.params.id ?? houseId) + "/upload";

      // On successful creation or edit, upload the image with the house Id that is returned or was in the URL.
      await this.$store
        .dispatch("addModifyImage", { data: data, imageApiLink: imageApiLink })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    },
    onChangeFileUpload() {
      // When a user uploads a file. first check if the user selected a file.
      // Then reference this file to this.file and set an URL that can be used.

      if (
        this.$refs.file.files[0] &&
        (this.$refs.file.files[0].name.split(".")[1] === "jpg" ||
          this.$refs.file.files[0].name.split(".")[1] === "jpeg" ||
          this.$refs.file.files[0].name.split(".")[1] === "png")
      ) {
        this.file = this.$refs.file.files[0];
        this.fileUrl = URL.createObjectURL(this.file);
      }
    },
    clearUpload() {
      // If the clear button on the image is pressed, remove all references to the image.

      this.file = null;
      this.fileUrl = null;
    },
  },
  async mounted() {
    // If a user navigated to the edit page directly, retrieve data from API as that was not done on the HouseOverview page.

    if (this.$route.params.id) {
      if (!this.$store.getters.houses.length) {
        await this.$store.dispatch("fetchHouses");
      }

      // Put the received data in the local object
      const result = this.$store.getters.house(+this.$route.params.id);
      this.form.price = result.price;
      this.form.bedrooms = result.rooms.bedrooms;
      this.form.bathrooms = result.rooms.bathrooms;
      this.form.size = result.size;

      // from the API, street contains street, housenumber and (optional) addition as one single string.
      // Split this by taking all letters untill the first digit as street,
      // all digits as house nr and everything after the last digit as addition.
      const street = result.location.street;
      //Get all the data untill the first digit. This is the street name
      this.form.streetName = street.substring(0, street.search(/\d/)).trim();
      // Get the first occurance of one or more digits. This is the house number
      this.form.houseNumber = street.match(/\d+/)[0];
      // Get everything after the house number. This is the addition
      this.form.numberAddition = street
        .substring(street.match(/\d+/)[0].length + street.match(/\d+/).index)
        .trim();

      this.form.zip = result.location.zip;
      this.form.city = result.location.city;
      this.form.constructionYear = result.constructionYear;

      // hasGarage returns true or false, convert this to Yes or No
      this.form.hasGarage = result.hasGarage ? "Yes" : "No";
      this.form.description = result.description;
      this.fileUrl = result.image;
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-image: none;
  position: relative;
  display: flex;
  justify-content: center;
  overflow-y: auto;
}
.listing {
  width: 90%;
  max-width: 400px;
  display: flex;
  position: relative;
  flex-direction: column;
}

.mobile-background {
  content: "";
  position: absolute;
  background-image: url("../../assets/img_background@3x.png");
  background-color: var(--ELEMENT-BACKGROUND-1);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom right;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.2;
  overflow-y: auto;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
}

header::after {
  content: "";
}

header img {
  height: 18px;
}

header .desktop {
  display: none;
}

.half-screen {
  display: flex;
  gap: 20px;
}

.half-screen-part {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
}

label {
  display: flex;
  padding: 20px 0 8px 0;
  font-size: var(--INPUT-FIELD-TITLE);
  font-weight: 600;
}

textarea {
  resize: none;
  border-radius: var(--DEFAULT-RADIUS);
  width: 100%;
  min-height: 8rem;
  font-size: var(--INPUT-FIELD);
}

input,
textarea,
select {
  width: 100%;
  padding: 15px;
  border-radius: var(--DEFAULT-RADIUS);
}

.upload label {
  align-self: start;
  position: relative;
}

.upload .file {
  display: inline;
}
.upload input {
  display: none;
}

.image {
  height: 100px;
  width: 100px;
  padding: 35px;
  border-color: var(--ELEMENT-TERTIARY-DARK);
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  object-fit: cover;
}

.upload .clear-upload {
  position: absolute;
  top: -5px;
  left: 80px;
  height: 30px;
}

.button-part {
  padding: 20px 0 20px 0;
}

button {
  background-color: var(--ELEMENT-PRIMARY);
  width: 100%;
  padding: 18px;
  color: white;
  border-radius: var(--DEFAULT-RADIUS);
}

.invalid {
  border: 1px solid red;
}

.invalid::placeholder {
  color: red;
}

.transparant {
  opacity: 0.5;
}

.error-message {
  margin: 10px 0 10px 0;
  font-size: var(--ERROR-MESSAGE);
  color: red;
  font-style: italic;
}

.not-active {
  display: none;
}

@media screen and (min-width: 800px) {
  .mobile-background {
    display: none;
  }

  .wrapper {
    width: 100%;
    background-image: url("../../assets/img_background@3x.png");
    background-color: var(--ELEMENT-BACKGROUND-1);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  .listing {
    width: 90%;
    max-width: 1600px;
    flex-direction: row;

    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    overflow-y: auto;
  }

  .filler {
    width: 40%;
  }

  header {
    flex-direction: column;
  }

  header a {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--TEXT-PRIMARY);
    font-weight: bold;
    font-size: var(--BACK-BUTTON-LABEL);
    padding-bottom: 30px;
  }

  header .desktop {
    display: inline;
  }
}
</style>
