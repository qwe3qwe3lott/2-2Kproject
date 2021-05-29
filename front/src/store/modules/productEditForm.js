export default {
    namespaced: true,
    state: {
        show: false,
        id: null,
        title: "",
        description: "",
        img: "",
        typeId: null,
        price: null,
        duration: null,
        report: {}
    },
    mutations: {
        CLEAR(state) {
            state.id = null
            state.title = ""
            state.description = ""
            state.img = ""
            state.typeId = null
            state.price = null
            state.duration = null
            state.report = ""
        },
        SET_SHOW(state, show) {
            state.show = show
        },
        SET_ID(state, id) {
            state.id = id
        },
        SET_TITLE(state, title) {
            state.title = title
        },
        SET_DESCRIPTION(state, description) {
            state.description = description
        },
        SET_IMG(state, img) {
            state.img = img
        },
        SET_TYPE_ID(state, typeId) {
            state.typeId = typeId
        },
        SET_PRICE(state, price) {
            state.price = price
        },
        SET_DURATION(state, duration) {
            state.duration = duration
        },
        SET_REPORT(state, report) {
            state.report = report
        },
        SET(state, payload) {
            state.id = payload.id
            state.title = payload.title
            state.description = payload.description
            state.img = payload.img
            state.typeId = payload.typeId
            state.price = payload.price
            state.duration = payload.duration
            state.report = ""
        }
    },
    getters: {
        isShow(state) {
            return state.show
        },
        getId(state) {
            return state.id
        },
        getTitle(state) {
            return state.title
        },
        getDescription(state) {
            return state.description;
        },
        getImg(state) {
            return state.img
        },
        getTypeId(state) {
            return state.typeId
        },
        getPrice(state) {
            return state.price
        },
        getDuration(state) {
            return state.duration
        },
        getReport(state) {
            return state.report
        }
    }
}