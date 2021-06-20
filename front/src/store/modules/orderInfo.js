export default {
    namespaced: true,
    state: {
        show: false,
        info: {
            id: "",
            description: "",
            phone: "",
            customer: "",
            price: "",
            duration: "",
            moment: "",
            products: []
        }
    },
    mutations: {
        SET_INFO(state, payload) {
            state.info = payload
        },
        SET_SHOW(state, payload) {
            state.show = payload
        }
    },
    getters: {
        isShow(state) {
            return state.show
        },
        getInfo(state) {
            return state.info
        }
    }
}