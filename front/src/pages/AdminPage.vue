<template>
  <div>
    <h1>Администраторская</h1>
    <div v-for="(item, index) in getUsers" :key="index">
      <h2>Пользователь № {{index + 1}}</h2>
      <p>Логин: {{item.login}}</p>
      <p>Роль: {{item.role}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "AdminPage",
  methods: {
    ...mapActions(['loadAllUsers']),
    ...mapGetters(['getAllUsers'])
  },
  created() {
    this.loadAllUsers()
  },
  computed: {
    getUsers() {
      return this.getAllUsers()
    }
  }
}
</script>

<style scoped>

</style>