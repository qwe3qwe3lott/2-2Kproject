<template>
  <div class="layout">
    <section class="moder">
      <article class="moder__panel">
        <h1 class="moder__title">Модераторная<span class="moder__title-backend" v-if="!getBackEnd"> (backend не отвечает)</span></h1>
        <button class="moder__exit-button" @click="logout">Выйти</button>
      </article>
      <nav class="moder__nav">
        <button class="moder__nav-button" @click="$router.push({ name: 'catalogEdit' })" v-bind:class="{ 'moder__nav-button_selected': check('catalogEdit')}">Настройка каталога</button>
        <button class="moder__nav-button" @click="$router.push({ name: 'orders' })" v-bind:class="{ 'moder__nav-button_selected': check('orders')}">Заказы</button>
      </nav>
    </section>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ModerPage",
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'main' })
    },
    check(name) {
      return name === this.$router.currentRoute.name
    }
  },
  computed: {
    ...mapGetters(['getBackEnd'])
  }
}
</script>