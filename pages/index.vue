<template>
  <div>
    <TheHeader
      :isCartOpen="isCartOpen"
      :cartLength="CART.length"
      @handle-click-cart="handleClickCart"
    />
    <TheSidebar />
    <div class="container">
      <Cart
        :products="CART"
        :isCartOpen="this.isCartOpen"
        @handle-click-cart="handleClickCart"
      />
      <Sort @select-sort="selectSort" />
      <div class="card__list">
        <Card
          v-for="product in filteredByCategory"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Cart from "@/components/cart/Cart.vue";

export default {
  name: "IndexPage",
  components: {
    Cart,
  },

  async asyncData({ $axios }) {
    const products = await $axios.$get(
      "https://frontend-test.idaproject.com/api/product/"
    );
    return { products };
  },

  data() {
    return {
      selectedCategoryId: 1,
      isCartOpen: false,
    };
  },

  mounted() {
    this.GET_CART_FROM_LS();
  },

  computed: {
    ...mapGetters(["CART"]),
    filteredByCategory() {
      return this.products.filter(
        (prod) => prod.category === this.selectedCategoryId
      );
    },
  },

  watch: {
    isCartOpen() {
      document.body.classList.toggle("overflow__hidden");
    },
  },

  methods: {
    ...mapActions(["ADD_TO_CART", "GET_CART_FROM_LS"]),

    selectSort(sortBy) {
      sortBy === "цене"
        ? this.products.sort((a, b) => (a.price > b.price ? 1 : -1))
        : this.products.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    },

    handleClickCart() {
      this.isCartOpen = !this.isCartOpen;
    },

    addToCart(product) {
      this.ADD_TO_CART(product);
    },
  },

  created() {
    this.$nuxt.$on("select-category", (selectedCategoryId) => {
      this.selectedCategoryId = selectedCategoryId;
    });
  },
};
</script>

<style lang="scss">
.container {
  margin-left: 248px;
  margin-top: 163px;
}

.card__list {
  display: flex;

  flex-wrap: wrap;
}
</style>
