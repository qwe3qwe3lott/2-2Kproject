<template>
  <section class="basket">
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
      <label class="basket-form__label" for="fio">ФИО:</label>
      <input class="basket-form__field" id="fio" type="text" v-model="fio" required pattern="[A-Za-zА-Яа-яЁё]{1,60}\s[A-Za-zА-Яа-яЁё]{1,60}\s[A-Za-zА-Яа-яЁё]{1,60}">
      <label class="basket-form__label" for="phone">Номер телефона:</label>
      <input class="basket-form__field" id="phone" type="tel" v-model="phone" required pattern="8?-?[0-9]{3}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}">
      <label class="basket-form__label" for="description">Комментарий:</label>
      <textarea class="basket-form__description" id="description" v-model="description" maxlength="250"/>
      <input class="basket-form__submit" type="submit" value="Отправить заказ">
      <p class="basket-form__report">{{(getBasketReport !== null ? getBasketReport.message : "")}}</p>
    </form>
    <div class="basket__element basket__redirect" v-if="getProductsInBasketCount === 0">
      <h2 class="basket__redirect-title">Корзина пуста</h2>
      <button class="basket__redirect-button" @click="$router.push({ name: 'catalog' })">Перейти в каталог</button>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BasketLayout",
  computed: {
    ...mapGetters(['getProductsInBasket', 'getProductsInBasketSumPrice', 'getProductsInBasketSumDuration',
      'getProductsInBasketCount', 'getBasketReport', 'getProductsInBasketIds'])
  },
  data() {
    return {
      fio: "",
      phone: "",
      description: ""
    }
  },
  methods: {
    ...mapActions(['addOrder']),
    displayDuration(duration) {
      let hours = Math.trunc(duration / 60)
      let minutes = duration % 60
      return (hours >= 1 ? " " + hours + " ч." : "") + (minutes > 0 ? " " + minutes + " мин." : "")
    },
    submit() {
      let payload = {
        customer: this.fio,
        phone: this.phone,
        description: this.description,
        price: this.getProductsInBasketSumPrice,
        duration: this.getProductsInBasketSumDuration,
        productIds: this.getProductsInBasketIds
      }
      this.addOrder(payload)
          .then(status => {
            if (status === 200) {
              this.$router.push({ name: 'catalog' })
            }
          })
    }
  }
}
</script>