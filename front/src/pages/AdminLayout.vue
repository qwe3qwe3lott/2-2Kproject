<template>
    <section class="admin">
      <article class="admin__panel">
        <h1 class="admin__title">Администраторная</h1>
        <button class="admin__exit-button" @click="logout">Выйти</button>
      </article>
      <nav class="admin__nav">
        <button class="admin__nav-button" @click="$router.push({ name: 'usersEdit' })" v-bind:class="{ 'admin__nav-button_selected': check('usersEdit')}">Настройка пользователей</button>
        <button class="admin__nav-button" @click="$router.push({ name: 'dashboard' })" v-bind:class="{ 'admin__nav-button_selected': check('dashboard')}">Дашборд</button>
      </nav>
      <router-view/>
    </section>
</template>

<script>
export default {
  name: "AdminLayout",
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'main' })
    },
    check(name) {
      return name === this.$router.currentRoute.name
    }
  }
}
</script>