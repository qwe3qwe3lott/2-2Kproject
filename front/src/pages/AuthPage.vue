<template>
  <section class="auth">
    <form class="auth__form auth-form" @submit.prevent="submit">
      <label class="auth-form__label" for="login">Логин: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="auth-form__field" id="login" type="text" v-model="login" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <label class="auth-form__label" for="password">Пароль: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="auth-form__field" id="password" type="password" v-model="password" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <input class="auth-form__submit" type="submit" value="Авторизироваться">
      <p class="auth-form__report">{{(this.getAuthReport !== null ? this.getAuthReport.message : "")}}</p>
    </form>
  </section>
</template>

<script>
import api from '../api'
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: "authPage",
  data() {
    return {
      login: "",
      password: ""
    }
  },
  computed: mapGetters(['getAuthReport']),
  methods: {
    ...mapMutations(['SET_AUTH_REPORT']),
    async submit() {
      api.auth.getToken({ login: this.login, hash: this.$CryptoJS.SHA256(this.password).toString(this.$CryptoJS.enc.Hex)})
        .then(res => {
          this.SET_AUTH_REPORT(null)
          localStorage.setItem('token', res.data.token)
          let route = 'main'
          switch (res.data.role) {
            case "admin":
              route = 'dashboard';
              break;
            case "moder":
              route = 'orders';
              break;
          }
          this.$router.push({ name: route })
        })
        .catch(err => {
          console.log(err)
          this.SET_AUTH_REPORT(err.response.data)
        })
    }
  }
}
</script>