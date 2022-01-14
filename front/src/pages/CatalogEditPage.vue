<template>
  <article class="catalog">
    <ModalWindow v-if="showEditForm" :title="'Редактирование'" @close="showEditForm = false">
      <template #content>
        <ProductEditForm @close="showEditForm = false" />
      </template>
    </ModalWindow>
    <div class="catalog__segments">
      <button class="catalog__add-button" @click="createProduct">Добавить новую позицию</button>
      <CatalogSegment v-for="(type, index) in this.getExistedProductTypes" :key="index" v-bind:cards="getProductCards(type)" :title="type" :edit="true" @edit="showEditForm = true"/>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CatalogSegment from '../components/CatalogSegment'
import ProductEditForm from '@/components/ProductEditForm'
import ModalWindow from '@/components/ModalWindow'

export default {
  name: 'CatalogEditPage',
  components: { ModalWindow, ProductEditForm, CatalogSegment },
  data () {
    return {
      showEditForm: false
    }
  },
  computed: {
    ...mapGetters(['getExistedProductTypes', 'getProductCards'])
  },
  methods: {
    ...mapActions(['loadAllProducts', 'loadAllProductTypes']),
    createProduct () {
      this.$store.commit('productEditForm/CLEAR')
      this.showEditForm = true
    }
  },
  created () {
    this.loadAllProducts()
    this.loadAllProductTypes()
  }
}
</script>
