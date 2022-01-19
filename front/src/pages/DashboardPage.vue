<template>
  <article class="dashboard">
    <p class="dashboard__alert">
      Не хватает ширины экрана
    </p>
    <div class="dashboard__container dashboard__diagram-container print-void">
      <h2 class="dashboard__subtitle">Соотношение категорий в каталоге</h2>
      <la-polar class="dashboard__pie" fillContainer  :data="this.getProductDashboardData" :width="500">
        <la-pie show-label label-prop="name" prop="pv"/>
      </la-polar>
    </div>
    <div class="dashboard__container dashboard__diagram-container print-void">
      <h2 class="dashboard__subtitle">Соотношение статусов заказов</h2>
      <la-polar class="dashboard__pie" fillContainer  :data="this.getOrdersDashboardData" :width="500">
        <la-pie show-label label-prop="name" prop="pv"/>
      </la-polar>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DashboardPage',
  computed: {
    ...mapGetters(['getProductDashboardData', 'getOrdersDashboardData'])
  },
  methods: {
    ...mapActions(['loadProductsDashboardData', 'loadOrdersDashboardData'])
  },
  created () {
    this.loadProductsDashboardData()
    this.loadOrdersDashboardData()
  }
}
</script>
