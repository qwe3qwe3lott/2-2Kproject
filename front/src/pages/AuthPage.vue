<template>
  <section class="auth">
    <button class="auth__switch-button" @click="isEmployerForm = !isEmployerForm">
      {{ isEmployerForm ? 'Для клиентов' : 'Для сотрудников' }}
    </button>
    <form v-if="!isEmployerForm && !isCodeEntering" class="auth__form auth-form" @submit.prevent="sendEmail">
      <label class="auth-form__label" for="email">Электронная почта: <span class="auth-form__label-tip">example@gmail.com</span></label>
      <input class="auth-form__field" id="email" type="email" v-model.trim="email" required>
      <input class="auth-form__submit" type="submit" value="Выслать код">
      <p class="auth-form__report">{{ customerReport }}</p>
    </form>
    <form v-else-if="!isEmployerForm && isCodeEntering" class="auth__form auth-form" @submit.prevent="customerSubmit">
      <label class="auth-form__label" for="code">Код из письма:</label>
      <input class="auth-form__field" id="code" type="text" v-model.trim="code" required>
      <input class="auth-form__submit" type="submit" value="Подтвердить код">
      <p class="auth-form__report">{{ customerReport }}</p>
    </form>
    <form v-else class="auth__form auth-form" @submit.prevent="employerSubmit">
      <label class="auth-form__label" for="login">Логин: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="auth-form__field" id="login" type="text" v-model.trim="login" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <label class="auth-form__label" for="password">Пароль: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="auth-form__field" id="password" type="password" v-model.trim="password" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <input class="auth-form__submit" type="submit" value="Авторизироваться">
      <p class="auth-form__report">{{ employerReport }}</p>
    </form>
  </section>
</template>

<script>
import api from '../api'
export default {
  name: 'authPage',
  data () {
    return {
      login: '',
      password: '',
      email: '',
      code: '',
      isEmployerForm: false,
      isCodeEntering: false,
      customerReport: '',
      employerReport: ''
    }
  },
  methods: {
    async employerSubmit () {
      try {
        const res = await api.auth.toAuth({ login: this.login, hash: this.$CryptoJS.SHA256(this.password).toString(this.$CryptoJS.enc.Hex) })
        this.employerReport = res.data.message
        localStorage.setItem('token', res.data.token)
        await this.$router.push({ name: res.data.routeName })
      } catch (err) {
        console.log(err)
        this.employerReport = err.response.data.message
      }
    },
    async sendEmail () {
      try {
        const res = await api.auth.sendEmail({ email: this.email })
        this.customerReport = res.data.message
        this.isCodeEntering = true
      } catch (err) {
        console.log(err)
        this.customerReport = err.response.data.message
      }
    },
    async customerSubmit () {
      try {
        const res = await api.auth.confirmCustomerCode({ email: this.email, code: this.code })
        this.customerReport = res.data.message
        localStorage.setItem('token', res.data.token)
        await this.$router.push({ name: res.data.routeName })
      } catch (err) {
        console.log(err)
        this.customerReport = err.response.data.message
      }
    }
  }
}
</script>
