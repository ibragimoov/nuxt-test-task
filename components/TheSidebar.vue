<template>
  <div class="sidebar">
    <h2 class="sidebar__title">Каталог</h2>
    <ul class="sidebar__category__list">
      <li
        class="sidebar__category__item"
        v-for="c in categories"
        :class="{ active: selectedCategory === c.name }"
        :key="c.i"
        @click="selectCategory(c)"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      selectedCategory: "Рюкзаки",
    };
  },

  methods: {
    selectCategory({ id, name }) {
      this.selectedCategory = name;
      this.$nuxt.$emit("select-category", id);
    },
  },

  async mounted() {
    const data = await this.$axios.$get(
      "https://frontend-test.idaproject.com/api/product-category"
    );
    this.categories = data;
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;

  left: 0px;
  top: 66px;

  padding-left: 88px;
  width: 336px;

  &__title {
    font-family: "PT Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 41px;

    margin-top: 32px;

    color: #1f1f1f;
  }

  &__category__list {
    margin-top: 24px;
    padding-left: 0;
  }

  &__category__item {
    font-family: "PT Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    display: flex;
    align-items: flex-end;

    margin-bottom: 16px;

    cursor: pointer;

    color: #959dad;

    &:hover {
      color: #59606d;
    }

    &.active {
      color: #1f1f1f;
      text-decoration-line: underline;
    }
  }
}
</style>
