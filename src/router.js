import { createRouter, createWebHistory } from "vue-router";

import HousesOverview from "./pages/HouseOverview.vue";
import AboutPage from "./pages/AboutPage.vue";
import CreateListing from "./pages/CreateListing.vue";
import EditListing from "./pages/EditListing.vue";
import DetailPage from "./pages/DetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HousesOverview },
    { path: "/house/create", component: CreateListing },
    { path: "/house/edit/:id", component: EditListing },
    { path: "/house/:id", component: DetailPage },
    { path: "/about", component: AboutPage },
  ],
});

export default router;
