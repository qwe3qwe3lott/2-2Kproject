<template>
  <div>
    <header class="header">
      <button class="header__button header__home-button" @click="$router.push({ name: 'main' })">Салон красоты "Джесси"</button>
      <nav class="header__nav">
        <button class="header__button" @click="$router.push({ name: 'orders' })">для сотрудников</button>
        <button class="header__button" @click="$router.push({ name: 'admin' })">для администрации</button>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout"
}
</script>