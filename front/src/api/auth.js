export default function (instance) {
    return {
        getToken(payload) {
            return instance.post('auth', payload)
        }
    }
}