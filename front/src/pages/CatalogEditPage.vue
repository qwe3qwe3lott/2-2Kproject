<template>
  <article class="catalog">
    <div class="catalog__segments">
      <button class="catalog__add-button" @click="createProduct">Добавить новую позицию</button>
      <CatalogSegment v-for="(type, index) in this.getExistedProductTypes" :key="index" v-bind:cards="getProductCards(type)" :title="type" :edit="true"/>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CatalogSegment from "../components/CatalogSegment";

export default {
  name: "CatalogEditPage",
  components: { CatalogSegment },
  computed: {
    ...mapGetters(['getExistedProductTypes', 'getProductCards'])
  },
  methods: {
    ...mapActions(['loadAllProducts', 'loadAllProductTypes']),
    createProduct() {
      this.$store.commit('productEditForm/CLEAR')
      this.$store.commit('productEditForm/SET_SHOW', true)
    }
  },
  created() {
    this.loadAllProducts()
    this.loadAllProductTypes()
  }
}
</script>