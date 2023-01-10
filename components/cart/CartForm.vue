<template>
  <div>
    <div class="success" v-if="isSuccess">
      <img class="success__image" src="images/success.png" alt="success" />
      <h2 class="success__title">Заявка успешно отправлена</h2>
      <p class="success__description">Вскоре наш менеджер свяжется с Вами</p>
    </div>
    <div v-if="!isSuccess">
      <form class="cart-form" @submit.prevent="handleSubmit">
        <h2 class="cart__body__description">Оформить заказ</h2>
        <input
          class="cart-form__input"
          id="input__name"
          placeholder="Ваше имя"
          type="text"
          required
        />
        <input
          class="cart-form__input"
          id="input__name"
          placeholder="Телефон"
          type="text"
          required
          v-mask="['+# (###) ###-##-##']"
        />
        <input
          class="cart-form__input"
          id="input__name"
          placeholder="Адрес"
          type="text"
          required
        />

        <button class="btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    isSuccess: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      username: null,
      phone: null,
      address: null,
    };
  },

  methods: {
    ...mapActions(["CLEAR_CART"]),
    handleSubmit() {
      this.username = null;
      this.phone = null;
      this.address = null;

      this.CLEAR_CART();
      this.$emit("change-success");
    },
  },
};
</script>

<style lang="scss">
.success {
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  position: absolute;

  top: 100px;
  left: 0;

  width: 100%;
  height: 80%;

  &__image {
    width: 80px;
    height: 80px;

    margin-bottom: 26px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;

    margin: 0;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    margin: 0;
  }
}

.cart-form {
  display: flex;
  flex-direction: column;

  padding-bottom: 70px;

  &__input {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    padding: 14px;
    margin-bottom: 16px;

    background: #f8f8f8;
    border-radius: 8px;
    border: none;
  }

  &__submit {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    height: 50px;

    color: $white;

    background: $black;
    border-radius: 8px;
  }
}
</style>
