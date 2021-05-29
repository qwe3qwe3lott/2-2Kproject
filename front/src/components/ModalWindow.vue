<template>
  <section class="modal-window" v-if="this.showModalWindow">
    <ProductInfo/>
    <ProductEditForm/>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import ProductEditForm from "@/components/modal/ProductEditForm";
import ProductInfo from "@/components/modal/ProductInfo";
export default {
  name: "ModalWindow",
  components: {ProductInfo, ProductEditForm},
  computed: mapGetters(['showModalWindow'])
}
</script>