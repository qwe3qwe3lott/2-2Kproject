<template>
  <section>
    <div class="orders__list">
      <OrderCard v-for="(order, index) in orders" :key="index" :order="order"/>
    </div>
  </section>
</template>

<script>
import OrderCard from '@/components/OrderCard'
import api from '@/api'
export default {
  name: 'CustomerHistoryPage',
  components: { OrderCard },
  data () {
    return {
      orders: []
    }
  },
  async mounted () {
    try {
      const res = await api.customer.getOrdersByEmail()
      this.orders = res.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
