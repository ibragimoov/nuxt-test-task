export const state = () => ({
  cart: [],
});

export const getters = {
  CART(state) {
    return state.cart;
  },
};

export const mutations = {
  SET_CART: (state, product) => {
    if (state.cart.length) {
      let isProductExist = false;

      state.cart.map((item) => {
        if (item.id === product.id) {
          isProductExist = true;
          item.quantity++;
        }
      });

      if (!isProductExist) {
        state.cart.push(product);
      }
    } else {
      state.cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  REMOVE_FROM_CART: (state, productId) => {
    state.cart = state.cart.filter((c) => c.id !== productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  CLEAR_CART: (state, _) => {
    state.cart = [];
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  CART_FROM_LS: (state, _) => {
    if (localStorage.getItem("cart") !== null) {
      state.cart = JSON.parse(localStorage.getItem("cart"));
    }
  },
};

export const actions = {
  ADD_TO_CART({ commit }, product) {
    commit("SET_CART", product);
  },
  DELETE_FROM_CART({ commit }, productId) {
    commit("REMOVE_FROM_CART", productId);
  },
  CLEAR_CART({ commit }, _) {
    commit("CLEAR_CART");
  },
  GET_CART_FROM_LS({ commit }) {
    commit("CART_FROM_LS");
  },
};
