<template>
  <div class="user-card">
    <h3 class="user-card__title">Учётная запись № {{index + 1}}</h3>
    <p class="user-card__prop">Логин: {{user.login}}</p>
    <p class="user-card__prop">Роль: {{ $interpreter.interpretUserRole(user.role) }}</p>
    <button class="user-card__delete-button" @click="this.delete"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserCard',
  props: ['user', 'index'],
  methods: {
    ...mapActions(['deleteUser', 'loadUsersList']),
    delete () {
      console.log(this.user.id)
      this.deleteUser({
        id: this.user.id
      }).then(status => {
        if (status === 200) this.loadUsersList()
      })
    }
  }
}
</script>
