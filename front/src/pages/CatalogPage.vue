<template>
  <article class="catalog">
    <CatalogFilter/>
    <div class="catalog__segments">
      <CatalogSegment v-for="(type, index) in getChosenTypes" :key="index" :cards="getFilteredProductCards(type)" :title="type" :edit="false"/>
    </div>
  </article>
</template>

<script>
import CatalogSegment from '@/components/CatalogSegment'
import CatalogFilter from '@/components/CatalogFilter'
import { mapGetters } from 'vuex'
export default {
  name: 'CatalogPage',
  components: { CatalogFilter, CatalogSegment },
  computed: {
    ...mapGetters(['getFilteredProductCards', 'getChosenTypes'])
  }
}
</script>
