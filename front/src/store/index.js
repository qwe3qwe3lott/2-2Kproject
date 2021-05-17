import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
'use strict';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        roles: [],
        products: [],
        userAddReport: "",
        backEnd: true
    },
    getters: {
        getAllUsers(state) {
            return state.users
        },
        getBackEnd(state) {
            return state.backEnd
        },
        getUserAddReport(state) {
            return state.userAddReport
        },
        getAllRoles(state) {
            return state.roles
        },
        getAllProductTypes(state) {
            return state.products.map(item => item.type)
                .filter((value, index, self) => self.indexOf(value) === index)
        },
        getProductCards: (state) => (type) => {
            return state.products.filter(function (el) {
                return el.type === type;
            })
        }
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload
        },
        SET_BACKEND(state, payload) {
            state.backEnd = payload
        },
        SET_USER_ADD_REPORT(state, payload) {
            state.userAddReport = payload
        },
        SET_ROLES(state, payload) {
            state.roles = payload
        },
        SET_PRODUCTS(state, payload) {
            state.products = payload
        }
    },
    actions: {
        async loadUsersList({ commit }) {
            let data
            try {
                data = (await api.admin.getUsersList()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                console.log(error)
                commit('SET_BACKEND', false)
            } finally {
                commit('SET_USERS', data)
            }
        },
        async sendUser({ commit }, payload) {
            let data, status
            try {
                let res = await api.admin.addUser(payload)
                data = res.date
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                data = error.response.data
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
            } finally {
                commit('SET_USER_ADD_REPORT', data)
            }
            return status
        },
        async loadAllRoles({ commit }) {
            let data
            try {
                data = (await api.admin.getAllRoles()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_ROLES', data)
            }
        },
        async loadAllProducts({ commit }) {
            let data
            try {
                data = (await api.user.getAllProducts()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_PRODUCTS', data)
            }
        },
        async deleteUser({ commit }, payload) {
            let status
            try {
                let res = await api.admin.deleteUser(payload)
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
            }
            return status
        },
        async deleteProduct({ commit }, payload) {
            let status
            try {
                let res = await api.moder.deleteProduct(payload)
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
            }
            return status
        },
    }
})