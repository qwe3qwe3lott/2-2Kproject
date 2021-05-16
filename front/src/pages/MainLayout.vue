<template>
  <div>
    <nav class="main-nav">
      <button class="main-nav__button" @click="$router.push({ name: 'main' })" v-bind:class="{ 'main-nav__button_selected': check('main')}">О нас</button>
      <button class="main-nav__button" @click="$router.push({ name: 'catalog' })" v-bind:class="{ 'main-nav__button_selected': check('catalog')}">Каталог</button>
      <button class="main-nav__button" @click="$router.push({ name: 'basket' })" v-bind:class="{ 'main-nav__button_selected': check('basket')}">Корзина</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  methods: {
    check(name) {
      return name === this.$router.currentRoute.name
    }
  }
}
</script>