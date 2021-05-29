<template>
  <form class="modal-window__window product-edit-form" v-if="$store.getters['productEditForm/isShow']" @submit.prevent="submit()">
    <button @click="$store.commit('productEditForm/SET_SHOW', false)" class="modal-window__close-button"/>
    <h3 class="product-edit-form__title">Параметры позиции</h3>
    <label for="pef-title" class="product-edit-form__label">Название</label>
    <input id="pef-title" type="text" v-model="title" class="product-edit-form__field" pattern="{6,50}" required>
    <label for="pef-description" class="product-edit-form__label">Описание</label>
    <textarea id="pef-description" v-model="description" class="product-edit-form__text-area" maxlength="255" required/>
    <label for="pef-img" class="product-edit-form__label">Ссылка на изображение</label>
    <input id="pef-img" type="url" v-model="img" pattern="https://.*" placeholder="https://domain/image.jpg" class="product-edit-form__field" required>
    <label for="pef-type-id" class="product-edit-form__label">Тип</label>
    <select id="pef-type-id" v-model="typeId" class="product-edit-form__drop-down" required>
      <option v-for="(item, index) in this.getAllProductTypes" :key="index" v-bind:value="item.id">{{interpretProductType(item.type)}}</option>
    </select>
    <label for="pef-price" class="product-edit-form__label">Цена (руб)</label>
    <input id="pef-price" type="number" min="1" max="1000000" v-model="price" class="product-edit-form__field" required>
    <label for="pef-duration" class="product-edit-form__label">Продолжительность (мин)</label>
    <input id="pef-duration" type="number" min="1" max="480" v-model="duration" class="product-edit-form__field" required>
    <input type="submit" value="Готово" class="product-edit-form__submit">
    <p class="product-edit-form__report">{{$store.getters["productEditForm/getReport"].message}}</p>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "ProductEditForm",
  created() {
    this.loadAllProductTypes()
  },
  methods: {
    ...mapActions(['loadAllProductTypes', 'addProduct', 'updateProduct', 'loadAllProducts']),
    submit() {
      let payload = {
        id: this.id,
        title: this.title,
        description: this.description,
        img: this.img,
        typeId: this.typeId,
        price: this.price,
        duration: this.duration
      }
      if (payload.id == null) {
        this.addProduct(payload)
          .then(status => {
          if (status === 200) {
            this.loadAllProducts()
            this.$store.commit('productEditForm/SET_SHOW', false)
          }
        })
      } else {
        this.updateProduct(payload)
          .then(status => {
            if (status === 200) {
              this.loadAllProducts()
              this.$store.commit('productEditForm/SET_SHOW', false)
            }
          })
      }
    },
    interpretProductType(type) {
      switch (type) {
        case 'hair':
          return 'Парикмахерский зал'
        case 'cure':
          return 'Маникюр, педикюр'
        case 'massage':
          return 'Массаж'
        case 'cosmetology':
          return 'Косметология'
        default:
          return type
      }
    }
  },
  computed: {
    ...mapGetters(['getAllProductTypes']),
    id: {
      get() {
        return this.$store.getters["productEditForm/getId"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_ID', value)
      }
    },
    title: {
      get() {
        return this.$store.getters["productEditForm/getTitle"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_TITLE', value)
      }
    },
    description: {
      get() {
        return this.$store.getters["productEditForm/getDescription"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_DESCRIPTION', value)
      }
    },
    img: {
      get() {
        return this.$store.getters["productEditForm/getImg"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_IMG', value)
      }
    },
    typeId: {
      get() {
        return this.$store.getters["productEditForm/getTypeId"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_TYPE_ID', value)
      }
    },
    price: {
      get() {
        return this.$store.getters["productEditForm/getPrice"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_PRICE', value)
      }
    },
    duration: {
      get() {
        return this.$store.getters["productEditForm/getDuration"]
      },
      set(value) {
        this.$store.commit('productEditForm/SET_DURATION', value)
      }
    }
  }
}
</script>