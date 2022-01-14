<template>
  <section class="modal-window" v-if="this.showModalWindow">
    <ProductInfo/>
    <ProductEditForm/>
    <OrderInfo/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductEditForm from '@/components/modal/ProductEditForm'
import ProductInfo from '@/components/modal/ProductInfo'
import OrderInfo from '@/components/modal/OrderInfo'
export default {
  name: 'ModalWindow',
  components: { OrderInfo, ProductInfo, ProductEditForm },
  computed: mapGetters(['showModalWindow'])
}
</script>
