<template>
  <section class="auth">
    <form class="auth__form auth-form" @submit.prevent="submit">
      <label class="auth-form__label" for="login">Логин:</label>
      <input class="auth-form__field" id="login" type="text" v-model="login" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <label class="auth-form__label" for="password">Пароль:</label>
      <input class="auth-form__field" id="password" type="password" v-model="password" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <input class="auth-form__submit" type="submit" value="Авторизироваться">
      <p class="auth-form__report">отчёт</p>
    </form>
  </section>
</template>

<script>
import api from '../api'
export default {
  name: "authPage",
  data() {
    return {
      login: "",
      password: ""
    }
  },
  methods: {
    async submit() {
      api.auth.getToken()
        .then(res => {
          localStorage.setItem('token', res.data.token)
          this.$router.push({ name: 'main' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>