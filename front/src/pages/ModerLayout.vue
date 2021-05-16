<template>
  <div>
    <nav class="moder-nav">
      <button class="moder-nav__button" @click="$router.push({ name: 'catalogEdit' })" v-bind:class="{ 'moder-nav__button_selected': check('catalogEdit')}">Настройка каталога</button>
      <button class="moder-nav__button" @click="$router.push({ name: 'orders' })" v-bind:class="{ 'moder-nav__button_selected': check('orders')}">Заказы</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "ModerPage",
  methods: {
    check(name) {
      return name === this.$router.currentRoute.name
    }
  }
}
</script>