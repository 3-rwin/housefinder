<template>
  <div class="footer">
    <router-link to="/">
      <img :src="houseImgSource" alt="houses" />
    </router-link>
    <router-link to="/about">
      <img :src="aboutImgSource" alt="about" />
    </router-link>
  </div>
</template>

<script>
import homeImgActive from "../../assets/ic_mobile_navigarion_home_active@3x.png";
import homeImg from "../../assets/ic_mobile_navigarion_home@3x.png";
import aboutImg from "../../assets/ic_mobile_navigarion_info@3x.png";
import aboutImgActive from "../../assets/ic_mobile_navigarion_info_active@3x.png";

export default {
  props: ["page"],
  computed: {
    houseImgSource() {
      return this.page !== "/about" ? homeImgActive : homeImg;
    },
    aboutImgSource() {
      return this.page === "/about" ? aboutImgActive : aboutImg;
    },
  },
  methods: {
    togglePage(pageName) {
      this.$emit("toggle-page", pageName);
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  width: 100%;
  background-color: var(--ELEMENT-BACKGROUND-2);
  box-shadow: 0px -5px 15px rgba(187, 187, 187, 0.75);
  z-index: 1;
}

.footer a {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  height: 80px;
  align-items: center;
}

.footer img {
  height: 30px;
}

@media screen and (min-width: 800px) {
  .footer {
    display: none;
  }
}
</style>
