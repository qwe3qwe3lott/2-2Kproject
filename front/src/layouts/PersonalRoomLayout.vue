<template>
  <section class="personal">
    <article class="personal__panel">
      <h1 class="personal__panel-title">{{title}}</h1>
      <button v-if="isAdmin" class="personal__panel-button" @click="$router.push({ name: 'orders' })">Перейти в модераторную</button>
      <button class="personal__panel-button" @click="logout">Выйти</button>
    </article>
    <nav class="personal__nav">
      <button class="personal__nav-button" v-for="(nav, index) in navs" :key="index" @click="$router.push({ name: nav.name })" :class="{ 'personal__nav-button_selected': check(nav.name)}">{{nav.label}}</button>
    </nav>
    <router-view class="personal__content"/>
  </section>
</template>

<script>
export default {
  name: 'PersonalRoomLayout',
  props: {
    title: { type: String, default: () => '' },
    isAdmin: { type: Boolean, default: () => false },
    navs: { type: Array, default: () => [] }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push({ name: 'main' })
    },
    check (name) {
      return name === this.$router.currentRoute.name
    }
  }
}
</script>
