<template>
  <div>
    <header class="header">
      <button class="header__button header__home-button" @click="$router.push({ name: 'main' })">Салон красоты "Наталья"</button>
      <button class="header__button" @click="$router.push({ name: 'moder' })">для сотрудников</button>
      <button class="header__button" @click="$router.push({ name: 'admin' })">для администрации</button>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout"
}
</script>

<style scoped>

</style>