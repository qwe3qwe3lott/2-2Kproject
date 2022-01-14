<template>
  <div class="modal-window__window product-info" v-if="$store.getters['productInfo/isShow']">
    <button @click="$store.commit('productInfo/SET_SHOW', false)" class="modal-window__close-button"/>
    <h3 class="product-info__title">{{this.$store.getters["productInfo/getTitle"]}}</h3>
    <p class="product-info__description">{{this.$store.getters["productInfo/getDescription"]}}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo'
}
</script>
