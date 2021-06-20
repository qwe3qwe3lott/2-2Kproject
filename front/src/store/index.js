import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import productEditForm from "./modules/productEditForm";
import productInfo from "./modules/productInfo";
import orderInfo from "@/store/modules/orderInfo";
'use strict';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        productEditForm,
        productInfo,
        orderInfo
    },
    state: {
        users: [],
        roles: [],
        productTypes: [],
        chosenTypes: [],
        products: [],
        productsInBasket: [],
        orders: [],
        orderStatuses: [],
        backEnd: true,
        userAddReport: null,
        authReport: null,
        basketReport: null,
        firstFilterPrice: null,
        secondFilterPrice: null,
        firstFilterDuration: null,
        secondFilterDuration: null,
        productsDashboardData: [],
        ordersDashboardData: [],
        ordersSearchNumber: ""
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
        },getBasketReport(state) {
            return state.basketReport
        },
        getAllRoles(state) {
            return state.roles
        },
        getAllProducts(state) {
            return state.products
        },
        getAllProductTypes(state) {
            return state.productTypes
        },
        getExistedProductTypes(state) {
            return state.products.map(item => item.type)
                .filter((value, index, self) => self.indexOf(value) === index).sort()
        },
        getFilteredProductCards: (state, getters) => (type) => {
            return state.products.filter(item => item.type === type && item.price >= getters.getMinFilterPrice
                && item.price <= getters.getMaxFilterPrice && item.duration >= getters.getMinFilterDuration
                && item.duration <= getters.getMaxFilterDuration)
        },
        getProductCards: (state) => (type) => {
            return state.products.filter(item => item.type === type)
        },
        getProductsInBasket(state) {
            return state.productsInBasket
        },
        checkBasketHasProduct: (state, getters) => (productId) => {
            return getters.getProductsInBasket.some(e => e.id === productId)
        },
        getProductsInBasketCount(state, getters) {
            return getters.getProductsInBasket.length
        },
        getProductsInBasketSumPrice(state) {
            return state.productsInBasket.sum('price')
        },
        getProductsInBasketSumDuration(state) {
            return state.productsInBasket.sum('duration')
        },
        getProductsInBasketIds(state) {
            return state.productsInBasket.map(item => item.id)
        },
        showModalWindow(state) {
          return state.productEditForm.show || state.productInfo.show || state.orderInfo.show
        },
        getAuthReport(state) {
            return state.authReport
        },
        getChosenTypes(state) {
            return state.chosenTypes.sort()
        },
        checkChosenTypeHasType: (state) => (type) => {
            return state.chosenTypes.some(e => e === type)
        },
        getFirstFilterPrice(state) {
            return state.firstFilterPrice
        },
        getSecondFilterPrice(state) {
            return state.secondFilterPrice
        },
        getMinFilterPrice(state) {
            return Math.min(state.firstFilterPrice, state.secondFilterPrice)
        },
        getMaxFilterPrice(state) {
            return Math.max(state.firstFilterPrice, state.secondFilterPrice)
        },
        getMinProductPrice(state) {
            return Math.min(...state.products.map(item => item.price))
        },
        getMaxProductPrice(state) {
            return Math.max(...state.products.map(item => item.price))
        },
        getFirstFilterDuration(state) {
            return state.firstFilterDuration
        },
        getSecondFilterDuration(state) {
            return state.secondFilterDuration
        },
        getMinFilterDuration(state) {
            return Math.min(state.firstFilterDuration, state.secondFilterDuration)
        },
        getMaxFilterDuration(state) {
            return Math.max(state.firstFilterDuration, state.secondFilterDuration)
        },
        getMinProductDuration(state) {
            return Math.min(...state.products.map(item => item.duration))
        },
        getMaxProductDuration(state) {
            return Math.max(...state.products.map(item => item.duration))
        },
        getProductDashboardData(state) {
            return state.productsDashboardData
        },
        getOrders(state) {
            return state.orders
        },
        getFilteredOrders(state) {
            return state.ordersSearchNumber === "" ? state.orders.slice().reverse() : state.orders.filter(order => order.id === Number(state.ordersSearchNumber))
        },
        getAllOrderStatuses(state) {
            return state.orderStatuses
        },
        getOrdersDashboardData(state) {
            return state.ordersDashboardData
        },
        getOrdersSearchNumber(state) {
            return state.ordersSearchNumber
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
        SET_BASKET_REPORT(state, payload) {
            state.basketReport = payload
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
            state.productsInBasket.splice(state.productsInBasket.findIndex(e => e.id === productId), 1)
        },
        CLEAR_PRODUCTS_IN_BASKET(state) {
            state.productsInBasket = []
        },
        SET_AUTH_REPORT(state, payload) {
            state.authReport = payload
        },
        SET_CHOSEN_TYPES(state, payload) {
            state.chosenTypes = payload
        },
        CHANGE_CHOSEN_TYPES(state, payload) {
            if (payload.checked) state.chosenTypes.push(payload.value)
            else state.chosenTypes.splice(state.chosenTypes.findIndex(e => e === payload.value), 1)
        },
        SET_FIRST_FILTER_PRICE(state, price) {
            state.firstFilterPrice = price
        },
        SET_SECOND_FILTER_PRICE(state, price) {
            state.secondFilterPrice = price
        },
        SET_FIRST_FILTER_DURATION(state, duration) {
            state.firstFilterDuration = duration
        },
        SET_SECOND_FILTER_DURATION(state, duration) {
            state.secondFilterDuration = duration
        },
        SET_PRODUCTS_DASHBOARD_DATA(state, data) {
            state.productsDashboardData = data
        },
        SET_ORDERS(state, orders) {
            state.orders = orders
        },
        SET_ORDER_STATUSES(state, payload) {
            state.orderStatuses = payload
        },
        SET_ORDERS_DASHBOARD_DATA(state, data) {
            state.ordersDashboardData = data
        },
        SET_ORDERS_SEARCH_NUMBER(state, number) {
            state.ordersSearchNumber = number
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
            return data
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
                data = res.data
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
        },
        async addOrder({ commit }, payload) {
            let data, status
            try {
                let res = await api.user.addOrder(payload)
                data = res.data
                status = res.status
                commit('SET_BACKEND', true)
            } catch (error) {
                data = error.response.data
                status = error.response.status
                if (status !== 422) commit('SET_BACKEND', false)
                if (status === 404) data = { message: "Не удалось отправить заказ, попробуйте повторить позже" }
            } finally {
                commit('SET_BASKET_REPORT', data)
            }
            return status
        },
        async loadAllOrders({ commit }) {
            let data
            try {
                data = (await api.moder.getAllOrders()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_ORDERS', data)
            }
        },
        async loadAllOrderStatuses({ commit }) {
            let data
            try {
                data = (await api.moder.getAllOrderStatuses()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_ORDER_STATUSES', data)
            }
        },
        async loadProductsDashboardData({ commit }) {
            let data
            try {
                data = (await api.admin.getProductsDashboardData()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_PRODUCTS_DASHBOARD_DATA', data)
            }
        },
        async loadOrdersDashboardData({ commit }) {
            let data
            try {
                data = (await api.admin.getOrdersDashboardData()).data
                commit('SET_BACKEND', true)
            } catch (error) {
                commit('SET_BACKEND', false)
                data = []
            }
            finally {
                commit('SET_ORDERS_DASHBOARD_DATA', data)
            }
        },
        async updateOrderStatus({ commit }, payload) {
            try {
                await api.moder.updateOrderStatus(payload)
                commit('SET_BACKEND', true)
            } catch (error) {
                if (status !== 422) commit('SET_BACKEND', false)
            }
        }
    }
})

Array.prototype.sum = function (prop) {
    let total = 0
    for (let i = 0, _len = this.length; i < _len; i++ ) total += this[i][prop]
    return total
}