export default {
    namespaced: true,
    state: {
        show: false,
        title: "",
        description: ""
    },
    mutations: {
        SET_SHOW(state, show) {
            state.show = show
        },
        SET_TITLE(state, title) {
            state.title = title
        },
        SET_DESCRIPTION(state, description) {
            state.description = description
        }
    },
    getters: {
        isShow(state) {
            return state.show
        },
        getTitle(state) {
            return state.title
        },
        getDescription(state) {
            return state.description
        }
    }
}