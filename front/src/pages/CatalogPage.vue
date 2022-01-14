<template>
  <article class="catalog">
    <ModalWindow v-if="showDescription" :title="'Описание'" @close="showDescription = false">
      <template #content>
        <p class="catalog__modal">
          {{ productDescription }}
        </p>
      </template>
    </ModalWindow>
    <CatalogFilter/>
    <div class="catalog__segments">
      <CatalogSegment v-for="(type, index) in getChosenTypes" :key="index" :cards="getFilteredProductCards(type)" :title="type" :edit="false" @chooseDescription="openModal"/>
    </div>
  </article>
</template>

<script>
import CatalogSegment from '@/components/CatalogSegment'
import CatalogFilter from '@/components/CatalogFilter'
import { mapGetters } from 'vuex'
import ModalWindow from '@/components/ModalWindow'
export default {
  name: 'CatalogPage',
  components: { ModalWindow, CatalogFilter, CatalogSegment },
  data () {
    return {
      showDescription: false,
      productDescription: ''
    }
  },
  computed: {
    ...mapGetters(['getFilteredProductCards', 'getChosenTypes'])
  },
  methods: {
    openModal (event) {
      this.productDescription = event
      this.showDescription = true
    }
  }
}
</script>
