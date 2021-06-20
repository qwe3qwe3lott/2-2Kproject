<template>
  <div class="modal-window__window order-info" v-if="$store.getters['orderInfo/isShow']">
    <button @click="$store.commit('orderInfo/SET_SHOW', false)" class="modal-window__close-button"/>
    <h3 class="order-info__title">Заказ номер {{info.id}}</h3>
    <p class="order-info__prop">Клиент: {{info.customer}}</p>
    <p class="order-info__prop">Телефон: {{info.phone}}</p>
    <p class="order-info__prop">Комментарий: {{info.description}}</p>
    <p class="order-info__prop">Сумма: {{info.price}}</p>
    <p class="order-info__prop">Продолжительность: {{info.duration}}</p>
    <p class="order-info__prop">Время приёма: {{info.moment}}</p>
    <h3 class="order-info__title">Содержание заказа:</h3>
    <ul class="order-info__list">
      <li class="order-info__list-element" v-for="(product, index) in info.products" :key="index">{{product.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  computed: {
    info: {
      get() {
        return this.$store.getters["orderInfo/getInfo"]
      }
    }
  }
}
</script>