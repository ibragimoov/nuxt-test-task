<template>
  <div class="sort" @click="openSort">
    <h2 class="sort__title">Сортировать по:</h2>
    <h2 class="sort__selected">
      {{ selectedSort }}
      <div class="sort__selected__icon">
        <svg
          width="5"
          height="3"
          viewBox="0 0 5 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 0H0L2.5 2.5L5 0Z" fill="#59606D" />
        </svg>
      </div>
    </h2>
    <ul class="sort__list" :class="{ active: isSort }">
      <li
        class="sort__list__item"
        :class="{ active: selectedSort === 'цене' }"
        @click="selectSort('цене')"
      >
        По цене
      </li>
      <li
        class="sort__list__item"
        :class="{ active: selectedSort === 'популярности' }"
        @click="selectSort('популярности')"
      >
        По популярности
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSort: false,
      selectedSort: "цене",
    };
  },

  methods: {
    openSort() {
      this.isSort = !this.isSort;
    },

    selectSort(sortBy) {
      this.selectedSort = sortBy;
      this.$emit("select-sort", sortBy);
    },
  },
};
</script>

<style lang="scss">
.sort {
  position: absolute;

  display: flex;

  top: 108px;
  right: 88px;

  user-select: none;
  cursor: pointer;

  &__title,
  &__selected {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
  }

  &__selected {
    margin-left: 6px;
  }

  &__selected__icon {
    content: "";

    position: absolute;

    top: 8px;
    right: -10px;
  }

  &__list {
    display: none;

    position: absolute;

    top: 100%;
    left: 0px;
    right: 0px;

    width: 100%;

    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 0;

    background: $white;

    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    &.active {
      display: block;
      z-index: 1;
    }

    &__item {
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 12px;
      padding-right: 12px;

      list-style-type: none;

      color: $grey-light;

      cursor: pointer;

      &:hover {
        color: $black;
        background-color: $gray-extra-light;
      }

      &.active {
        background-color: $gray-extra-light;
      }
    }
  }
}
</style>
