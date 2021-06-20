<template>
  <article class="users">
    <h2 class="users__title">Учётные записи сотрудников</h2>
    <div class="users__cards">
      <user-card v-for="(user, index) in getAllUsers" :key="index" :index="index" :user="user"/>
    </div>
    <h2 class="users__title">Добавление учётной записи</h2>
    <form class="reg-form" @submit.prevent="submit()">
      <label class="reg-form__label" for="login">Логин: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="reg-form__field" id="login" type="text" v-model="login" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <label class="reg-form__label" for="password">Пароль: <span class="auth-form__label-tip">буквы и цифры (6-30)</span></label>
      <input class="reg-form__field" id="password" type="password" v-model="password" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
      <label class="reg-form__label" for="role">Роль:</label>
      <select class="reg-form__drop-down" id="role" required v-model="roleId">
        <option v-for="(item, index) in this.getAllRoles" :key="index" v-bind:value="item.id">{{interpretRole(item.role)}}</option>
      </select>
      <input class="reg-form__submit" type="submit" value="Добавить учётную запись">
      <p class="reg-form__report">{{(getUserAddReport != null ? getUserAddReport.message : "")}}</p>
    </form>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserCard from "../components/UserCard";
export default {
  name: "UsersEditPage",
  components: {UserCard},
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'main' })
    },
    ...mapActions(['loadUsersList', 'addUser', 'loadAllRoles']),
    submit() {
      let passHash = this.$CryptoJS.SHA256(this.password).toString(this.$CryptoJS.enc.Hex)
      let salt = this.$CryptoJS.lib.WordArray.random(128 / 8).toString(this.$CryptoJS.enc.Hex)
      let hash = this.$CryptoJS.SHA256(passHash + salt).toString(this.$CryptoJS.enc.Hex)
      this.addUser({
        login: this.login,
        hash,
        salt,
        roleId: this.roleId
      }).then(status => {
        if (status === 200) {
          this.login = this.password = ""
          this.loadUsersList()
        }
      })
    },
    interpretRole(role) {
      switch (role) {
        case 'admin':
          role = "Администратор";
          break;
        case 'moder':
          role = "Модератор";
          break;
      }
      return role
    }
  },
  created() {
    this.loadUsersList()
    this.loadAllRoles()
  },
  computed: {
    ...mapGetters(['getAllUsers', 'getBackEnd', 'getUserAddReport', 'getAllRoles'])
  },
  data() {
    return {
      login: "",
      password: "",
      roleId: ""
    }
  }
}
</script>