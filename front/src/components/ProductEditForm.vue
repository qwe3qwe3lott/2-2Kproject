<template>
  <form class="product-edit-form" @submit.prevent="submit()">
    <label for="pef-title" class="product-edit-form__label">Название</label>
    <input id="pef-title" type="text" v-model="title" class="product-edit-form__field" pattern="[A-Za-zА-Яа-яЁё\s0-9]{4,50}" required>
    <label for="pef-description" class="product-edit-form__label">Описание</label>
    <textarea id="pef-description" v-model="description" class="product-edit-form__textarea" maxlength="250" required/>
    <label for="pef-img" class="product-edit-form__label">Ссылка на изображение</label>
    <input id="pef-img" type="url" v-model="img" pattern="https://.*" placeholder="https://domain/image.jpg" class="product-edit-form__field" required>
    <label for="pef-type-id" class="product-edit-form__label">Тип</label>
    <select id="pef-type-id" v-model="type" class="product-edit-form__drop-down" required>
      <option v-for="(item, index) in this.getAllProductTypes" :key="index" :value="item.type">{{$interpreter.interpretProductCategory(item.type)}}</option>
    </select>
    <label for="pef-price" class="product-edit-form__label">Цена (руб)</label>
    <input id="pef-price" type="number" min="1" max="1000000" v-model="price" class="product-edit-form__counter" required>
    <label for="pef-duration" class="product-edit-form__label">Продолжительность (мин)</label>
    <input id="pef-duration" type="number" min="1" max="480" v-model="duration" class="product-edit-form__counter" required>
    <input type="submit" value="Готово" class="product-edit-form__submit">
    <p class="product-edit-form__report">{{$store.state.productEditForm.report.message}}</p>
  </form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'ProductEditForm',
  methods: {
    ...mapActions(['addProduct', 'updateProduct', 'loadAllProducts']),
    ...mapMutations('productEditForm', ['SET_IMG', 'SET_TYPE', 'SET_DESCRIPTION', 'SET_DURATION', 'SET_PRICE', 'SET_REPORT', 'SET_TITLE']),
    submit () {
      const payload = {
        id: this.id,
        title: this.title,
        description: this.description,
        img: this.img,
        type: this.type,
        price: this.price,
        duration: this.duration
      }
      if (payload.id == null) {
        this.addProduct(payload)
          .then(status => {
            if (status === 200) {
              this.loadAllProducts()
              this.$emit('close')
            }
          })
      } else {
        this.updateProduct(payload)
          .then(status => {
            if (status === 200) {
              this.loadAllProducts()
              this.$emit('close')
            }
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getAllProductTypes']),
    id: {
      get () { return this.$store.state.productEditForm.id },
      set (value) { this.SET_ID(value) }
    },
    title: {
      get () { return this.$store.state.productEditForm.title },
      set (value) { this.SET_TITLE(value) }
    },
    description: {
      get () { return this.$store.state.productEditForm.description },
      set (value) { this.SET_DESCRIPTION(value) }
    },
    img: {
      get () { return this.$store.state.productEditForm.img },
      set (value) { this.SET_IMG(value) }
    },
    type: {
      get () { return this.$store.state.productEditForm.type },
      set (value) { this.SET_TYPE(value) }
    },
    price: {
      get () { return this.$store.state.productEditForm.price },
      set (value) { this.SET_PRICE(value) }
    },
    duration: {
      get () { return this.$store.state.productEditForm.duration },
      set (value) { this.SET_DURATION(value) }
    }
  }
}
</script>
