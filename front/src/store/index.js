import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
'use strict';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        roles: [],
        products: [
            {
                id: '1',
                title: 'Услуга',
                description: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
                img: 'https://st.depositphotos.com/1037262/2659/i/950/depositphotos_26594615-stock-photo-change-of-scene.jpg',
                duration: '20 мин',
                price: '100 руб.',
                type: 'massage'
            },
            {
                id: '2',
                title: 'Услуга',
                description: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
                img: 'https://st.depositphotos.com/1037262/2659/i/950/depositphotos_26594615-stock-photo-change-of-scene.jpg',
                duration: '20 мин',
                price: '100 руб.',
                type: 'hair'
            },
            {
                id: '3',
                title: 'Услуга',
                description: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
                img: 'https://st.depositphotos.com/1037262/2659/i/950/depositphotos_26594615-stock-photo-change-of-scene.jpg',
                duration: '20 мин',
                price: '100 руб.',
                type: 'massage'
            }
        ],
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
        }
    },
    actions: {
        async loadUsersList({ commit }) {
            let data
            try {
                data = (await api.admin.getUsersList()).data
                commit('SET_BACKEND', true)
            } catch (error) {
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