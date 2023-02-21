import {createStore} from "vuex";

import favoritesModule from "./modules/favorites.js";
import api from "../api/api.js";

export default createStore({
  modules: {
    fav: favoritesModule,
  },
  state: {
    houses: [],
  },
  getters: {
    houses(state) {
      // Return all the stored houses.

      return state.houses;
    },
    house: (state) => (id) => {
      // Return a specific house based on the id.

      return state.houses.filter((house) => {
        return id === house.id;
      })[0];
    },
  },
  actions: {
    async fetchHouses(context) {
      // Fetch all the houses from the backend.

      try {
        const data = await api.get();
        context.commit("setHouses", data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async addModifyHouse(context, {data, apiLink}) {
      return await api.post(apiLink, data);
    },
    async addModifyImage(context, {data, imageApiLink}) {
      return await api.post(imageApiLink, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async deleteHouse(context, id) {
      return await api.delete(id);
    },
  },
  mutations: {
    setHouses(state, payload) {
      state.houses = payload;
      console.log(state.houses);
    },
  },
});
