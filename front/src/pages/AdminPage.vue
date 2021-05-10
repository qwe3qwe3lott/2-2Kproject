<template>
  <section class="admin">
    <h1 class="admin__title">Администраторская</h1>
    <h2 class="admin__subtitle">Учётные записи</h2>
    <div class="admin__users-container">
      <user-card v-for="(user, index) in getUsers" :key="index" :index="index" :user="user"/>
    </div>
    <h2 class="admin__subtitle">Добавить учётную запись</h2>
    <form>

    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserCard from "../components/UserCard";
export default {
  name: "AdminPage",
  components: {UserCard},
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