<template>
  <article class="order-success">
    <h2 class="order-success__title" v-if="this.getBasketReport !== null">Заказ успешно сформирован</h2>
    <p class="order-success__message order-success__message_selected" v-if="this.getBasketReport !== null">Номер заказа: {{(this.getBasketReport !== null ? getBasketReport.number : "")}}</p>
    <p class="order-success__message" v-if="this.getBasketReport !== null">Мы позвоним вам в течение нескольких минут для подтверждения заказа</p>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderSuccessPage',
  computed: mapGetters(['getBasketReport'])
}
</script>
