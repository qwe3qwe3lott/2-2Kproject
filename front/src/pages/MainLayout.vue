<template>
  <section class="client">
    <nav class="client__nav">
      <button class="client__nav-button" @click="$router.push({ name: 'main' })" v-bind:class="{ 'client__nav-button_selected': check('main')}">О нас</button>
      <button class="client__nav-button" @click="$router.push({ name: 'catalog' })" v-bind:class="{ 'client__nav-button_selected': check('catalog')}">Каталог</button>
      <button class="client__nav-button" @click="$router.push({ name: 'basket' })" v-bind:class="{ 'client__nav-button_selected': check('basket')}">Корзина <span v-if="this.getProductsInBasketCount > 0"> ({{getProductsInBasketCount}})</span></button>
    </nav>
    <router-view class="client__content"/>
    <MainFooter/>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MainFooter from '@/components/MainFooter'
export default {
  name: 'MainLayout',
  components: { MainFooter },
  computed: mapGetters(['getProductsInBasketCount', 'getMinProductPrice', 'getMaxProductPrice', 'getMinProductDuration', 'getMaxProductDuration']),
  methods: {
    ...mapActions(['loadAllProducts']),
    ...mapMutations(['SET_CHOSEN_TYPES', 'SET_FIRST_FILTER_PRICE', 'SET_SECOND_FILTER_PRICE', 'SET_FIRST_FILTER_DURATION', 'SET_SECOND_FILTER_DURATION']),
    check (name) {
      return name === this.$router.currentRoute.name
    }
  },
  created () {
    this.loadAllProducts().then(data => {
      this.SET_CHOSEN_TYPES(data.map(item => item.type)
        .filter((value, index, self) => self.indexOf(value) === index))
      this.SET_FIRST_FILTER_PRICE(this.getMinProductPrice)
      this.SET_SECOND_FILTER_PRICE(this.getMaxProductPrice)
      this.SET_FIRST_FILTER_DURATION(this.getMinProductDuration)
      this.SET_SECOND_FILTER_DURATION(this.getMaxProductDuration)
    })
  }
}
</script>
