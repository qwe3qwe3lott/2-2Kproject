<template>
  <div class="layout">
    <header class="header">
      <button class="header__button header__home-button" @click="$router.push({ name: 'main' })">Салон красоты "Джесси"</button>
      <nav class="header__nav">
        <button class="header__button" @click="$router.push({ name: 'orders' })">для сотрудников</button>
        <button class="header__button" @click="$router.push({ name: 'dashboard' })">для администрации</button>
      </nav>
    </header>
    <router-view class="body__content"/>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout"
}
</script>