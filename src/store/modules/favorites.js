// The favoritesModule is used to locally store data on wich houses are selected as favorite.

export default {
  state() {
    return {
      favorites: [],
    };
  },
  mutations: {
    setFavorites(state, payload) {
      // Set the array of favorites id's based on the locally stored data as
      // retrieved in the action retrieveFavorites.

      if (payload) {
        state.favorites = payload;
      } else {
        state.favorites = [];
      }
    },
    toggleFavorite(state, payload) {
      // Set or unset a favorite based on the id of the house.

      if (state.favorites.includes(payload)) {
        const index = state.favorites.indexOf(payload);
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    deleteFavorite(state, payload) {
      // Delete a favorite id if it is in the array.

      if (state.favorites.includes(payload)) {
        const index = state.favorites.indexOf(payload);
        state.favorites.splice(index, 1);
      }
    },
  },
  actions: {
    toggleFavorite(context, payload) {
      context.commit("toggleFavorite", payload);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    retrieveFavorites(context) {
      // window.localStorage.removeItem('favorites');
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      context.commit("setFavorites", favorites);
    },
  },
  getters: {
    favorites(state) {
      return state.favorites;
    },
  },
};
