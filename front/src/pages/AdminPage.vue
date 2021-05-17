<template>
  <section class="admin">
    <article class="admin__panel">
      <h1 class="admin__title">Администраторная<span class="admin__title-backend" v-if="!getBackEnd"> (backend не отвечает)</span></h1>
      <button class="admin__exit-button" @click="logout">Выйти</button>
    </article>
    <article class="admin__users">
      <h2 class="admin__subtitle">Учётные записи сотрудников</h2>
      <div class="admin__users-container">
        <user-card v-for="(user, index) in getAllUsers" :key="index" :index="index" :user="user"/>
      </div>
    </article>
    <article class="admin__reg-form">
      <h2 class="admin__subtitle">Добавление учётной записи</h2>
      <form class="reg-form" @submit.prevent="submit()">
        <label class="reg-form__label" for="login">Логин:</label>
        <input class="reg-form__field" id="login" type="text" v-model="login" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
        <label class="reg-form__label" for="password">Пароль:</label>
        <input class="reg-form__field" id="password" type="password" v-model="password" required pattern="[A-Za-zА-Яа-яЁё0-9]{6,30}">
        <label class="reg-form__label" for="role">Роль:</label>
        <select class="reg-form__drop-down" id="role" required v-model="roleId">
          <option v-for="(item, index) in getAllRoles" :key="index" v-bind:value="item.id">{{interpriteRole(item.role)}}</option>
        </select>
        <input class="reg-form__submit" type="submit" value="Добавить учётную запись">
        <p class="reg-form__report">{{getUserAddReport}}</p>
      </form>
    </article>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserCard from "../components/UserCard";
export default {
  name: "AdminPage",
  components: {UserCard},
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'main' })
    },
    ...mapActions(['loadUsersList', 'sendUser', 'loadAllRoles']),
    submit() {
      let passHash = this.$CryptoJS.SHA256(this.password).toString(this.$CryptoJS.enc.Hex)
      console.log(passHash)
      let salt = this.$CryptoJS.lib.WordArray.random(128 / 8).toString(this.$CryptoJS.enc.Hex)
      console.log(salt)
      let hash = this.$CryptoJS.SHA256(passHash + salt).toString(this.$CryptoJS.enc.Hex)
      console.log(hash)
      this.sendUser({
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
    interpriteRole(role) {
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