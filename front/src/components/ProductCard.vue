<template>
  <div class="product-card">
    <img class="product-card__img" :src="props.img">
    <div class="product-card__info">
      <h3 class="product-card__title">{{ props.title }}</h3>
      <p class="product-card__prop">Цена: {{props.price}}</p>
      <p class="product-card__prop">Продолжительность: {{props.duration}}</p>
      <div class="product-card__buttons">
        <button class="product-card__button-decrease" v-if="!edit">-</button>
        <p class="product-card__count" v-if="!edit"></p>
        <button class="product-card__button-increase" v-if="!edit">+</button>
        <button class="product-card__button" v-if="edit">Изменить</button>
        <button class="product-card__button" v-if="edit" @click="deleteThisProduct">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ProductCard",
  props: ['props', 'edit'],
  methods: {
    ...mapActions(['deleteProduct']),
    deleteThisProduct() {
      this.deleteProduct({ id: this.props.id })
      .then(status => {
        console.log(status)
      })
    }
  }
}
</script>