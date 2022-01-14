<template>
  <div class="root">
    <header class="header">
      <button class="header__button header__home-button" @click="$router.push({ name: 'main' })">Салон красоты "Джесси"</button>
      <nav class="header__nav">
        <button class="header__button" @click="$router.push({ name: 'dashboard' })">личный кабинет</button>
      </nav>
    </header>
    <router-view class="root__content"/>
  </div>
</template>

<script>
export default {
  name: 'HeaderLayout'
}
</script>
