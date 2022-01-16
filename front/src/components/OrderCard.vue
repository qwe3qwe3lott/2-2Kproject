<template>
<div class="orders__list-element">
  <div class="orders__list-element-header">
    <span class="orders__list-element-id">{{`№${order.id}`}}</span>
    <select v-if="isEditMode" class="orders__list-element-select" :value="order.order_status.id" @change="$emit('changeOrderStatus', $event)">
      <option v-for="(item, index) in orderStatuses" :key="index" :value="item.id">{{$interpreter.interpretOrderStatus(item.status)}}</option>
    </select>
    <span v-else>{{$interpreter.interpretOrderStatus(order.order_status.status)}}</span>
    <button class="orders__list-element-open-button" @click="showBody ^= true"/>
  </div>
  <div v-if="showBody" class="orders__list-element-body">
    <p class="orders__list-element-body-prop">Клиент: {{order.customer}}</p>
    <p class="orders__list-element-body-prop">Телефон: {{order.phone}}</p>
    <p class="orders__list-element-body-prop">Электронная почта: {{order.email}}</p>
    <hr class="orders__list-element-body-line">
    <p class="orders__list-element-body-prop">Сумма: {{order.price}} руб.</p>
    <p class="orders__list-element-body-prop">Продолжительность: {{$interpreter.interpretDuration(order.duration)}}</p>
    <p class="orders__list-element-body-prop">Время приёма: {{$interpreter.interpretDate(order.moment)}}</p>
    <hr class="orders__list-element-body-line">
    <ul class="orders__list-element-body-list">
      <li class="orders__list-element-body-list-element" v-for="(product, index) in order.products" :key="index">{{product.title}}</li>
    </ul>
    <hr class="orders__list-element-body-line">
    <p class="orders__list-element-body-prop">Комментарий: {{order.description}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    order: { type: Object, default: () => {} },
    orderStatuses: { type: Array, default: () => [] },
    isEditMode: { type: Boolean, default: () => false }
  },
  data () {
    return {
      showBody: false
    }
  }
}
</script>
