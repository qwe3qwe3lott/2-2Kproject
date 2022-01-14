<template>
  <article class="basket">
    <ul class="basket__element basket__list" v-if="getProductsInBasketCount !== 0">
      <li class="basket__list-element basket__list-element_product" v-for="(product, index) in getProductsInBasket" :key="index">
        <p class="basket__list-element-prop basket__list-element-title">{{product.title}}</p>
        <p class="basket__list-element-prop basket__list-element-price">{{product.price}} руб.</p>
        <p class="basket__list-element-prop basket__list-element-duration">{{displayDuration(product.duration)}}</p>
      </li>
      <li class="basket__list-element basket__list-element_sum">
        <p class="basket__list-element-prop basket__list-element-title">Итого</p>
        <p class="basket__list-element-prop basket__list-element-price">{{getProductsInBasketSumPrice}} руб.</p>
        <p class="basket__list-element-prop basket__list-element-duration">{{displayDuration(getProductsInBasketSumDuration)}}</p>
      </li>
    </ul>
    <form class="basket__element basket__form basket-form" @submit.prevent="submit()" v-if="getProductsInBasketCount !== 0">
      <label class="basket-form__label" for="fio">ФИО: <span class="auth-form__label-tip">(например: Козлов Александр Владимирович)</span></label>
      <input class="basket-form__field" id="fio" type="text" v-model="fio" required pattern="[A-Za-zА-Яа-яЁё]{1,60}\s[A-Za-zА-Яа-яЁё]{1,60}\s[A-Za-zА-Яа-яЁё]{1,60}">
      <label class="basket-form__label" for="phone">Номер телефона: <span class="auth-form__label-tip">(например: 8-800-555-35-35)</span></label>
      <input class="basket-form__field" id="phone" type="tel" v-model="phone" required pattern="8?-?[0-9]{3}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}">
      <label class="basket-form__label" for="email">Электронная почта: <span class="auth-form__label-tip">(например: example@gmail.com)</span></label>
      <input class="basket-form__field" id="email" type="email" v-model="email" required pattern="[^@\s]+@[^@\s]+\.[^@\s]+">
      <label class="basket-form__label" for="moment">Время:</label>
      <input class="basket-form__field" id="moment" type="datetime-local" v-model="moment" required>
      <label class="basket-form__label" for="description">Комментарий:</label>
      <textarea class="basket-form__textarea" id="description" v-model="description" maxlength="250"/>
      <input class="basket-form__submit" type="submit" value="Отправить заказ">
      <p class="basket-form__report">{{(getBasketReport !== null ? getBasketReport.message : "")}}</p>
    </form>
    <div class="basket__element basket__redirect" v-if="getProductsInBasketCount === 0">
      <h2 class="basket__redirect-title">Корзина пуста</h2>
      <button class="basket__redirect-button" @click="$router.push({ name: 'catalog' })">Перейти в каталог</button>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BasketLayout',
  computed: {
    ...mapGetters(['getProductsInBasket', 'getProductsInBasketSumPrice', 'getProductsInBasketSumDuration',
      'getProductsInBasketCount', 'getBasketReport', 'getProductsInBasketIds'])
  },
  data () {
    return {
      fio: '',
      phone: '',
      email: '',
      description: '',
      moment: null
    }
  },
  methods: {
    ...mapMutations(['CLEAR_PRODUCTS_IN_BASKET']),
    ...mapActions(['addOrder']),
    displayDuration (duration) {
      const hours = Math.trunc(duration / 60)
      const minutes = duration % 60
      return (hours >= 1 ? ' ' + hours + ' ч.' : '') + (minutes > 0 ? ' ' + minutes + ' мин.' : '')
    },
    submit () {
      const payload = {
        customer: this.fio,
        phone: this.phone,
        moment: this.moment,
        description: this.description,
        price: this.getProductsInBasketSumPrice,
        duration: this.getProductsInBasketSumDuration,
        productIds: this.getProductsInBasketIds,
        email: this.email
      }
      this.addOrder(payload)
        .then(status => {
          if (status === 200) {
            this.CLEAR_PRODUCTS_IN_BASKET()
            this.$router.push({ name: 'orderSuccess' })
          }
        })
    }
  }
}
</script>
