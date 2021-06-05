<template>
  <div class="layout">
    <section class="admin">
      <article class="admin__panel">
        <h1 class="admin__title">Администраторная<span class="admin__title-backend" v-if="!getBackEnd"> (backend не отвечает)</span></h1>
        <button class="admin__exit-button" @click="logout">Выйти</button>
      </article>
      <nav class="admin__nav">
        <button class="admin__nav-button" @click="$router.push({ name: 'usersEdit' })" v-bind:class="{ 'admin__nav-button_selected': check('usersEdit')}">Настройка пользователей</button>
        <button class="admin__nav-button" @click="$router.push({ name: 'dashboard' })" v-bind:class="{ 'admin__nav-button_selected': check('dashboard')}">Дашборд</button>
      </nav>
    </section>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

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
  },
  computed: {
    ...mapGetters(['getBackEnd'])
  }
}
</script>