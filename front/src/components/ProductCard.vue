<template>
  <div class="product-card">
    <img class="product-card__img" :src="props.img">
    <div class="product-card__info">
      <h3 class="product-card__title">{{ props.title }}</h3>
      <p class="product-card__prop">Цена: {{props.price}} руб.</p>
      <p class="product-card__prop">Продолжительность:{{displayDuration(this.props.duration)}}</p>
      <div class="product-card__buttons">
        <button @click="$emit('chooseDescription', props.description)" class="product-card__button" v-if="!edit">Описание</button>
        <button @click="addThisProductToBasket" class="product-card__button" :class="{'product-card__button_selected': this.checkBasketHasProduct(props.id)}" v-if="!edit">{{!this.checkBasketHasProduct(props.id) ? "В корзину" : "В корзине"}}</button>
        <button class="product-card__button" v-if="edit" @click="editThisProduct">Изменить</button>
        <button class="product-card__button" v-if="edit" @click="deleteThisProduct">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['props', 'edit'],
  computed: mapGetters(['checkBasketHasProduct']),
  methods: {
    ...mapActions(['deleteProduct', 'loadAllProducts']),
    ...mapMutations(['ADD_PRODUCT_TO_BASKET', 'DELETE_PRODUCT_FROM_BASKET']),
    deleteThisProduct () {
      this.deleteProduct({ id: this.props.id })
        .then(status => {
          if (status === 200) {
            this.loadAllProducts()
          }
        })
    },
    addThisProductToBasket () {
      if (!this.checkBasketHasProduct(this.props.id)) { this.ADD_PRODUCT_TO_BASKET(this.props) } else { this.DELETE_PRODUCT_FROM_BASKET(this.props.id) }
    },
    editThisProduct () {
      this.$store.commit('productEditForm/SET', this.props)
      this.$emit('edit', true)
    },
    displayDuration (duration) {
      const hours = Math.trunc(duration / 60)
      const minutes = duration % 60
      return (hours >= 1 ? ' ' + hours + ' ч.' : '') + (minutes > 0 ? ' ' + minutes + ' мин.' : '')
    }
  }
}
</script>
