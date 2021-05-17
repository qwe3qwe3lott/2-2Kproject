<template>
  <section class="catalog">
    <CatalogSegment v-for="(type, index) in getAllProductTypes" :key="index" v-bind:cards="getProductCards(type)" :title="type" :edit="false"/>
  </section>
</template>

<script>
import CatalogSegment from "@/components/CatalogSegment";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CatalogPage",
  components: { CatalogSegment },
  computed: {
    ...mapGetters(['getAllProductTypes', 'getProductCards'])
  },
  methods: {
    ...mapActions(['loadAllProducts'])
  },
  created() {
    this.loadAllProducts()
  }
}
</script>