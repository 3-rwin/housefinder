<template>
  <the-header :page="page"></the-header>
  <router-view></router-view>
  <the-footer :page="page"></the-footer>
</template>

<script>
import TheHeader from "./components/nav/TheHeader.vue";
import TheFooter from "./components/nav/TheFooter.vue";

export default {
  data() {
    return {
      page: "/",
    };
  },
  watch: {
    "$route.path"(value) {
      // Monitor the URL. If it is /about toggle the buttons to set about active.
      // Otherwise Houses is active.

      this.page = value;
    },
  },
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/montserrat");

:root {
  /* COLORS */
  --ELEMENT-PRIMARY: rgb(235, 84, 64);
  --ELEMENT-SECONDARY: rgb(74, 75, 76);
  --ELEMENT-TERTIARY-LIGHT: rgb(232, 232, 232);
  --ELEMENT-TERTIARY-DARK: rgb(195, 195, 195);
  --ELEMENT-BACKGROUND-1: rgb(246, 246, 246);
  --ELEMENT-BACKGROUND-2: rgb(255, 255, 255);

  --TEXT-PRIMARY: rgb(0, 0, 0);
  --TEXT-SECONDARY: rgb(74, 75, 76);
  --TEXT-HYPERLINK: rgb(6, 123, 194);

  /* Styles */
  --DEFAULT-RADIUS: 8px;

  /*  Mobile Text Styles */
  --HEADER-1: 18px;
  --HEADER-2: 14px;
  --BUTTONS: 12px;
  --INPUT-FIELD-TITLE: 12px;
  --INPUT-FIELD: 12px;
  --BODY: 12px;
  --EMPTY-STATE-MESSAGE: 14px;
  --ERROR-MESSAGE: 12px;

  /* Desktop Only */
  --ACTIVE-MENU-HEADER: 18px;
  --BACK-BUTTON-LABEL: 16px;
  --LISTING-INFORMATION: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", "Open Sans";
  font-size: var(--BODY);
}

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--ELEMENT-BACKGROUND-1);
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: fixed;
}

a {
  cursor: pointer;
  text-decoration: inherit;
  color: var(--TEXT-HYPERLINK);
}

h1 {
  font-size: var(--HEADER-1);
}

h2 {
  font-size: var(--HEADER-2);
}

button {
  border: none;
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  font-size: var(--BUTTONS);
  font-weight: bold;
}

input,
textarea,
select {
  border: none;
  font: inherit;
  font-size: var(--INPUT-FIELD);
  font-family: "Open sans";
}

@media screen and (min-width: 800px) {
  :root {
    /* Desktop Text Styles */
    --HEADER-1: 32px;
    --HEADER-2: 22px;
    --BUTTONS: 18px;
    --INPUT-FIELD-TITLE: 14px;
    --INPUT-FIELD: 18px;
    --BODY: 18px;
    --EMPTY-STATE-MESSAGE: 18px;
    --ERROR-MESSAGE: 14px;
    --LISTING-INFORMATION: 16px;
  }

  #app {
    min-height: 100vh;
    position: relative;
    justify-content: flex-start;
  }
}
</style>
