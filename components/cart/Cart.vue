<template>
  <div class="cart" :class="{ active: isCartOpen }">
    <div class="cart__overlay" @click="handleClickCart"></div>
    <div class="cart__wrapper">
      <div class="cart__header">
        <h2 class="cart__header__title">Корзина</h2>
        <div class="cart__header__close" @click="handleClickCart">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div
        class="cart__empty"
        v-if="products.length === 0 && isSuccess === false"
      >
        <h2 class="cart__empty__title">
          Пока что вы ничего не добавили в корзину.
        </h2>
        <button class="btn" @click="handleClickCart">Перейти к выбору</button>
      </div>
      <div v-else>
        <div class="cart__body" v-if="!isSuccess">
          <h2 class="cart__body__description">Товары в корзине</h2>
          <CartItem v-for="prod in products" :key="prod.id" :product="prod" />
        </div>
        <CartForm :isSuccess="isSuccess" @change-success="handleSuccess" />
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/cart/CartItem.vue";
import CartForm from "@/components/cart/CartForm.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
    CartForm,
  },

  data() {
    return {
      isSuccess: false,
    };
  },

  props: {
    isCartOpen: {
      type: Boolean,
      default() {
        return false;
      },
    },
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    handleClickCart() {
      this.$emit("handle-click-cart");
      this.isSuccess = false;
    },

    handleSuccess() {
      this.isSuccess = !this.isSuccess;
    },
  },
};
</script>

<style lang="scss">
.cart {
  display: none;

  z-index: 2;

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  &.active {
    display: block;
  }

  &__overlay {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: $white;
    opacity: 0.8;
  }

  &__wrapper {
    position: absolute;

    overflow-y: auto;

    top: 0;
    right: 0;

    width: 364px;
    height: 100vh;

    padding-top: 52px;
    padding-right: 48px;
    padding-left: 48px;

    background: $white;
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0px 0px 8px;
  }

  &__header {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;

    &__title {
      font-weight: 700;
      font-size: 32px;
      line-height: 41px;

      margin-top: 0;
    }

    &__close {
      position: absolute;

      top: 12px;
      right: 0;
      cursor: pointer;
    }
  }

  &__body {
    &__description {
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;

      margin-bottom: 16px;

      color: $grey;
    }
  }

  &__empty {
    &__title {
      font-weight: 400;
      font-size: 22px;
      line-height: 28px;

      margin-bottom: 24px;
    }
  }
}
</style>
