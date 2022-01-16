<template>
  <section>
    <OrderCard v-for="(order, index) in order" :key="index" :order="order"/>
  </section>
</template>

<script>
import OrderCard from '@/components/OrderCard'
export default {
  name: 'CustomerHistoryPage',
  components: { OrderCard },
  data () {
    return {
      orders: []
    }
  },
  mounted () {
    // Загрузить заказы
  }
}
</script>
