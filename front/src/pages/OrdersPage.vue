<template>
  <article class="orders">
    <div class="orders__search-form">
      <label class="orders__search-form-label" for="orderIdSearch">Поиск заказа по номеру</label>
      <input class="orders__search-form-field" id="orderIdSearch" type="number" v-model="searchNumber">
    </div>
    <div class="orders__list">
      <OrderCard v-for="(order, index) in getFilteredOrders" :key="index" :order="order" :order-statuses="getAllOrderStatuses" @changeOrderStatus="changeStatus(order.id, $event)" />
      <!--<li class="orders__list-element" v-for="(order, index) in getFilteredOrders" :key="index">
        <p class="orders__list-element-prop orders__list-element-id">{{order.id}}</p>
        <div class="orders__list-element-prop orders__list-element-status">
          <select class="orders__list-select" v-model="order.order_status.id" @change="changeStatus(order.id, $event)">
            <option v-for="(item, index) in getAllOrderStatuses" :key="index" :value="item.id">{{interpretOrderStatus(item.status)}}</option>
          </select>
        </div>
        <div class="orders__list-element-prop orders__list-element-description">
          <button class="orders__list-button" @click="showInfo(order)">Подробнее</button>
        </div>
      </li>-->
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
    },
    showInfo (order) {
      this.$store.commit('orderInfo/SET_INFO', order)
      this.$store.commit('orderInfo/SET_SHOW', true)
    },
    interpretOrderStatus (status) {
      switch (status) {
        case 'Untreated':
          return 'На рассмотрении'
        case 'Planned':
          return 'Запланировано'
        case 'Denied':
          return 'Отказано'
        case 'Done':
          return 'Выполнено'
        default:
          return status
      }
    }
  },
  created () {
    this.loadAllOrders()
    this.loadAllOrderStatuses()
  }
}
</script>
