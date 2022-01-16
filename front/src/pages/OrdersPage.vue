<template>
  <article class="orders">
    <div class="orders__search-form">
      <label class="orders__search-form-label" for="orderIdSearch">Поиск заказа по номеру</label>
      <input class="orders__search-form-field" id="orderIdSearch" type="number" v-model="searchNumber">
    </div>
    <div class="orders__list">
      <OrderCard v-for="(order, index) in getFilteredOrders" :key="index" :is-edit-mode="true" :order="order" :order-statuses="getAllOrderStatuses" @changeOrderStatus="changeStatus(order.id, $event)" />
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderCard from '@/components/OrderCard'

export default {
  name: 'OrdersPage',
  components: { OrderCard },
  computed: {
    ...mapGetters(['getFilteredOrders', 'getAllOrderStatuses']),
    searchNumber: {
      get () {
        return this.$store.getters.getOrdersSearchNumber
      },
      set (value) {
        this.$store.commit('SET_ORDERS_SEARCH_NUMBER', value)
      }
    }
  },
  methods: {
    ...mapActions(['loadAllOrders', 'loadAllOrderStatuses', 'updateOrderStatus']),
    changeStatus (id, event) {
      console.log(id)
      console.log(event)
      this.updateOrderStatus({ orderId: id, statusId: event.target.value })
    }
  },
  created () {
    this.loadAllOrders()
    this.loadAllOrderStatuses()
  }
}
</script>
