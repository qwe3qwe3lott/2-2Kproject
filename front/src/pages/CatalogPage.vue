<template>
  <section class="catalog">
    <aside class="catalog__options">
      <h2 class="catalog__options-subtitle">Категории</h2>
      <label class="catalog__options-type-filter-label" v-for="(type, index) in getExistedProductTypes" :key="index" >
        <input class="catalog__options-type-filter" type="checkbox" :value="type" :checked="checkChosenTypeHasType(type)" @change="chooseType">{{interpretTitle(type)}}
      </label>
      <h2 class="catalog__options-subtitle">Цена</h2>
      <div class="catalog__options-slider">
        <input type="range" :min="this.getMinProductPrice" :max="this.getMaxProductPrice" v-model="firstFilterPrice" step="1">
        <input type="range" :min="this.getMinProductPrice" :max="this.getMaxProductPrice" v-model="secondFilterPrice" step="1">
      </div>
      <div class="catalog__options-price-slider-values">
        <p class="catalog__options-price-slider-value">Мин: {{ getMinFilterPrice }} руб.</p>
        <p class="catalog__options-price-slider-value">Макс: {{ getMaxFilterPrice }} руб.</p>
      </div>
      <h2 class="catalog__options-subtitle">Продолжительность</h2>
      <div class="catalog__options-slider">
        <input type="range" :min="this.getMinProductDuration" :max="this.getMaxProductDuration" v-model="firstFilterDuration" step="1">
        <input type="range" :min="this.getMinProductDuration" :max="this.getMaxProductDuration" v-model="secondFilterDuration" step="1">
      </div>
      <div class="catalog__options-slider-values">
        <p class="catalog__options-slider-value">Мин: {{ this.displayDuration(getMinFilterDuration) }}</p>
        <p class="catalog__options-slider-value">Макс: {{ this.displayDuration(getMaxFilterDuration) }}</p>
      </div>
      <button class="catalog__options-reset" @click="resetOptions">Сбросить</button>
    </aside>
    <div class="catalog__segments">
      <CatalogSegment v-for="(type, index) in getChosenTypes" :key="index" :cards="getFilteredProductCards(type)" :title="type" :edit="false"/>
    </div>
  </section>
</template>

<script>
import CatalogSegment from "@/components/CatalogSegment";
import {mapGetters, mapMutations} from "vuex";
export default {
  name: "CatalogPage",
  components: { CatalogSegment },
  computed: {
    ...mapGetters(['getExistedProductTypes', 'getFilteredProductCards', 'getChosenTypes', 'checkChosenTypeHasType',
      'getMinProductPrice', 'getMaxProductPrice', 'getMinFilterPrice', 'getMaxFilterPrice', 'getMinProductDuration',
      'getMaxProductDuration', 'getMinFilterDuration', 'getMaxFilterDuration', 'getAllProducts']),
    firstFilterPrice: {
      get() {
        return this.$store.getters['getFirstFilterPrice']
      },
      set(value) {
        this.$store.commit('SET_FIRST_FILTER_PRICE', value)
      }
    },
    secondFilterPrice: {
      get() {
        return this.$store.getters['getSecondFilterPrice']
      },
      set(value) {
        this.$store.commit('SET_SECOND_FILTER_PRICE', value)
      }
    },
    firstFilterDuration: {
      get() {
        return this.$store.getters['getFirstFilterDuration']
      },
      set(value) {
        this.$store.commit('SET_FIRST_FILTER_DURATION', value)
      }
    },
    secondFilterDuration: {
      get() {
        return this.$store.getters['getSecondFilterDuration']
      },
      set(value) {
        this.$store.commit('SET_SECOND_FILTER_DURATION', value)
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGE_CHOSEN_TYPES', 'SET_CHOSEN_TYPES', 'SET_FIRST_FILTER_PRICE', 'SET_SECOND_FILTER_PRICE',
      'SET_FIRST_FILTER_DURATION', 'SET_SECOND_FILTER_DURATION']),
    resetOptions() {
      this.SET_CHOSEN_TYPES(this.getAllProducts.map(item => item.type)
          .filter((value, index, self) => self.indexOf(value) === index))
      this.SET_FIRST_FILTER_PRICE(this.getMinProductPrice)
      this.SET_SECOND_FILTER_PRICE(this.getMaxProductPrice)
      this.SET_FIRST_FILTER_DURATION(this.getMinProductDuration)
      this.SET_SECOND_FILTER_DURATION(this.getMaxProductDuration)
    },
    interpretTitle(title) {
      switch (title) {
        case 'hair':
          return 'Парикмахерский зал'
        case 'cure':
          return 'Маникюр, педикюр'
        case 'massage':
          return 'Массаж'
        case 'cosmetology':
          return 'Косметология'
        default:
          return title
      }
    },
    displayDuration(duration) {
      let hours = Math.trunc(duration / 60)
      let minutes = duration % 60
      return (hours >= 1 ? " " + hours + " ч." : "") + (minutes > 0 ? " " + minutes + " мин." : "")
    },
    chooseType(e) {
      this.CHANGE_CHOSEN_TYPES({ value: e.target.value, checked: e.target.checked })
    }
  }
}
</script>