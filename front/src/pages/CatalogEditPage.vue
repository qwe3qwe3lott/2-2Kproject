<template>
  <section class="catalog">
    <CatalogSegment v-for="(type, index) in getAllProductTypes" :key="index" v-bind:cards="getProductCards(type)" :title="type" :edit="true"/>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CatalogSegment from "@/components/CatalogSegment";

export default {
  name: "CatalogEditPage",
  components: {CatalogSegment},
  computed: {
    ...mapGetters(['getAllProductTypes', 'getProductCards'])
  }
}
</script>