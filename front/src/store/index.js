import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

// eslint-disable-next-line no-unused-vars
const loadAllUsers = () => {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve([{
                    login: "test admin",
                    role: "admin"
                },
                {
                    login: "test moder",
                    role: "moder"
                }])
        }, 100)
    }))
}

export default new Vuex.Store({
    state: {
        users: []
    },
    getters: {
        getAllUsers(state) {
            return state.users
        }
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload
        }
    },
    actions: {
        async loadAllUsers({ commit }) {
            let data
            try {
                data = (await api.admin.getUsersList()).data
                console.log(data)
            } catch (error) {
                console.log(error.response.data)
                data = await loadAllUsers()
            } finally {
                commit('SET_USERS', data)
            }
        }
    }
})