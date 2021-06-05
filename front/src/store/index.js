import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import productEditForm from "./modules/productEditForm";
import productInfo from "./modules/productInfo";
'use strict';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        productEditForm,
        productInfo
    },
    state: {
        users: [],
        roles: [],
        productTypes: [],
        products: [],
        productsInBasket: [],
        userAddReport: {},
        backEnd: true,
        authReport: ""
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
            return state.productTypes
        },
        getExistedProductTypes(state) {
            return state.products.map(item => item.type)
                .filter((value, index, self) => self.indexOf(value) === index)
        },
        getProductCards: (state) => (type) => {
            return state.products.filter(function (el) {
                return el.type === type;
            })
        },
        checkBasketHasProduct: (state) => (productId) => {
            return state.productsInBasket.some(e => e.id === productId)
        },
        getProductsInBasketCount(state) {
            return state.productsInBasket.length
        },
        showModalWindow(state) {
          return state.productEditForm.show || state.productInfo.show
        },
        getAuthReport(state) {
            return state.authReport
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
        SET_PRODUCT_TYPES(state, payload) {
            state.productTypes = payload
        },
        SET_PRODUCTS(state, payload) {
            state.products = payload
        },
        ADD_PRODUCT_TO_BASKET(state, payload) {
            state.productsInBasket.unshift(payload)
        },
        DELETE_PRODUCT_FROM_BASKET(state, productId) {
            state.productsInBasket.splice(state.productsInBasket.findIndex(e => e.id === productId))
        },
        SET_AUTH_REPORT(state, payload) {
            state.authReport = payload
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
        async addUser({ commit }, payload) {
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
        async loadAllProductTypes({ commit }) {
            let data
            try {
                data = (await api.moder.getAllProductTypes()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_PRODUCT_TYPES', data)
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
        async updateProduct({ commit }, payload) {
            let data, status
            try {
                let res = await api.moder.updateProduct(payload)
                data = res.data
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                data = error.response.data
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
            } finally {
                commit('productEditForm/SET_REPORT', data)
            }
            return status
        },
        async addProduct({ commit }, payload) {
            let data, status
            try {
                let res = await api.moder.addProduct(payload)
                data = res.date
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                data = error.response.data
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
            } finally {
                commit('SET_PRODUCT_ADD_REPORT', data)
            }
            return status
        }
    }
})