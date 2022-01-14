export default {
  namespaced: true,
  state: {
    id: null,
    title: '',
    description: '',
    img: '',
    type: null,
    price: null,
    duration: null,
    report: {}
  },
  mutations: {
    CLEAR (state) {
      state.id = null
      state.title = ''
      state.description = ''
      state.img = ''
      state.type = null
      state.price = null
      state.duration = null
      state.report = {}
    },
    SET_ID (state, id) { state.id = id },
    SET_TITLE (state, title) { state.title = title },
    SET_DESCRIPTION (state, description) { state.description = description },
    SET_IMG (state, img) { state.img = img },
    SET_TYPE (state, typeId) { state.type = typeId },
    SET_PRICE (state, price) { state.price = price },
    SET_DURATION (state, duration) { state.duration = duration },
    SET_REPORT (state, report) { state.report = report },
    SET (state, payload) {
      state.id = payload.id
      state.title = payload.title
      state.description = payload.description
      state.img = payload.img
      state.type = payload.type
      state.price = payload.price
      state.duration = payload.duration
      state.report = {}
    }
  }
}
